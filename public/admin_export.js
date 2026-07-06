// Admin Export System - Premium Data Export via SheetJS & jsPDF

class ExportManager {
    constructor() {
        this.initDropdown();
    }

    initDropdown() {
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('exportDropdown');
            if (!dropdown) return;

            const exportBtn = e.target.closest('button');
            if (exportBtn && exportBtn.innerText.includes('Export') && exportBtn.querySelector('.fa-download')) {
                e.stopPropagation();
                
                if (dropdown.classList.contains('show') && this.currentBtn === exportBtn) {
                    dropdown.classList.remove('show');
                    this.currentBtn = null;
                    return;
                }

                this.currentBtn = exportBtn;
                
                // Position dropdown
                const rect = exportBtn.getBoundingClientRect();
                dropdown.style.top = `${rect.bottom + window.scrollY}px`;
                // Align right edge of dropdown with right edge of button if there is space, or just left align
                dropdown.style.left = `${rect.right - 180 + window.scrollX}px`; // 180 is approx width of dropdown
                
                dropdown.classList.add('show');
            } else if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    showToast(message) {
        let container = document.getElementById('copy-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'copy-toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        container.appendChild(toast);
        
        toast.offsetHeight; // trigger reflow
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    getVisibleTableData() {
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return null;

        // Find primary table
        const table = activeSection.querySelector('table');
        if (!table) return null;

        const headers = [];
        table.querySelectorAll('thead th').forEach(th => {
            const text = th.innerText.trim();
            if (text !== '') headers.push(text);
        });

        const rows = [];
        table.querySelectorAll('tbody tr').forEach(tr => {
            // Ignore visually hidden rows (search/filters)
            if (window.getComputedStyle(tr).display === 'none') return;
            
            const rowData = [];
            tr.querySelectorAll('td').forEach((td, index) => {
                if (index < headers.length) {
                    let text = td.innerText.replace(/\n/g, ' ').trim();
                    rowData.push(text);
                }
            });
            if (rowData.length > 0) rows.push(rowData);
        });

        return { headers, rows, moduleName: activeSection.id.replace('s-', '') };
    }

    setLoading(btn, isLoading) {
        if (!btn) return;
        const icon = btn.querySelector('i:first-child');
        if (isLoading) {
            btn.classList.add('loading');
            if (icon) icon.className = 'fas fa-spinner fa-spin';
        } else {
            btn.classList.remove('loading');
            if (icon) icon.className = btn.dataset.originalIcon || 'fas fa-download';
        }
    }

    async exportData(format) {
        const btnElement = this.currentBtn;
        const data = this.getVisibleTableData();
        if (!data || data.rows.length === 0) {
            this.showToast('No visible data to export from this tab.');
            return;
        }

        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = `${data.moduleName}-${dateStr}`;

        if (btnElement) {
            btnElement.dataset.originalIcon = btnElement.querySelector('i').className;
            this.setLoading(btnElement, true);
        }

        await new Promise(resolve => setTimeout(resolve, 50)); // Render spinner

        try {
            if (format === 'excel' || format === 'csv') {
                this.exportExcelCsv(data.headers, data.rows, fileName, format);
            } else if (format === 'pdf') {
                this.exportPDF(data.headers, data.rows, fileName);
            }
            this.showToast(`✓ ${format.toUpperCase()} exported successfully.`);
        } catch (error) {
            console.error('Export failed', error);
            this.showToast('❌ Export failed. Libraries may not be loaded.');
        } finally {
            if (btnElement) this.setLoading(btnElement, false);
            const drop = document.getElementById('exportDropdown');
            if (drop) drop.classList.remove('show');
        }
    }

    exportExcelCsv(headers, rows, fileName, format) {
        if (typeof XLSX === 'undefined') throw new Error("SheetJS missing");

        const worksheetData = [headers, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        
        const colWidths = headers.map((h, i) => {
            let max = h.length;
            rows.forEach(row => { if (row[i] && row[i].length > max) max = row[i].length; });
            return { wch: Math.min(max + 2, 50) };
        });
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Export");

        if (format === 'excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
        else XLSX.writeFile(workbook, `${fileName}.csv`, { bookType: "csv" });
    }

    exportPDF(headers, rows, fileName) {
        if (typeof window.jspdf === 'undefined') throw new Error("jsPDF missing");

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        doc.setFontSize(18);
        doc.text("ZoroBoost Panel Export", 14, 20);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        doc.autoTable({
            head: [headers],
            body: rows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [26, 26, 29], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 249, 252] },
            styles: { fontSize: 9, cellPadding: 4 },
            margin: { top: 35 }
        });

        doc.save(`${fileName}.pdf`);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.adminExportManager = new ExportManager();
    });
} else {
    window.adminExportManager = new ExportManager();
}
