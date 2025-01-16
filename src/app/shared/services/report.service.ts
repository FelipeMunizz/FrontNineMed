import { Injectable } from "@angular/core";
import html2canvas from './../../../../node_modules/html2canvas/dist/html2canvas.esm';
import jsPDF from './../../../../node_modules/jspdf/dist/jspdf.es';

@Injectable({
    providedIn: 'root' 
})

export class ReportService {
    exportToPDF(elementId: string, fileName: string): void {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error('Elemento não encontrado para exportação!');
        return;
      }
  
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      });
    }
  
    print(elementId: string): void {
        const element = document.getElementById(elementId);
        if (!element) {
          console.error('Elemento não encontrado para impressão!');
          return;
        }
    
        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
          const styles = Array.from(document.styleSheets)
            .map((sheet) =>
              sheet.href ? `<link rel="stylesheet" href="${sheet.href}">` : ''
            )
            .join('');
    
          printWindow.document.write(`
            <html>
              <head>
                <title>Impressão</title>
                ${styles}
              </head>
              <body>${element.outerHTML}</body>
            </html>
          `);
    
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      }
  }