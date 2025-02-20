document.addEventListener('DOMContentLoaded', () => {
    const writingsGrid = document.getElementById('writingsGrid');
    
    const pdfFiles = [
        {
            name: "Nueva Blockchain Club Website Article 1",
            filename: "Nueva Blockchain Club _ Website Article 1.pdf"
        },
        {
            name: "Nueva Blockchain Club Website Article 2",
            filename: "Nueva Blockchain Club _ Website Article 2.pdf"
        },
        {
            name: "Lie Groups with Applications in quantum mechanics",
            filename: "Lie_Groups_with_Applications_in_quantum_mechanics.pdf"
        },
        {
            name: "Elliptic Curve Cryptology",
            filename: "elliptic_curve_cryptology.pdf"
        },
        {
            name: "Interactive Proofs",
            filename: "interactive_proofs.pdf"
        },
        {
            name: "Fast Matrix Multiplication",
            filename: "Fast_Matrix_Multiplication.pdf"
        },
        {
            name: "Probabilistic Algorithms",
            filename: "Probabilistic_Algorithms.pdf"
        },
        {
            name: "Path Optimizations",
            filename: "Path_Optimizations.pdf"
        },
        {
            name: "Manifolds",
            filename: "Manifolds.pdf"
        },
        {
            name: "M3 2023 Team 16738",
            filename: "M3_2023___Team_16738 (1).pdf"
        }
    ];

    pdfFiles.forEach(file => {
        const div = document.createElement('div');
        div.className = 'writing-card';
        div.innerHTML = `
            <h3>${file.name}</h3>
            <a href="${file.filename}" target="_blank" class="pdf-link">View PDF</a>
        `;
        writingsGrid.appendChild(div);
    });
});
