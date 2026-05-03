document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewSection = document.getElementById('preview-section');
    const actions = document.getElementById('actions');
    const originalPreview = document.getElementById('original-preview');
    const resultPreview = document.getElementById('optimized-preview');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loading = document.getElementById('loading');

    // Handle Drop Zone Events
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    async function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Silakan pilih file gambar!');
            return;
        }

        // Show loading and original image
        loading.style.display = 'block';
        dropZone.style.display = 'none';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            originalPreview.src = e.target.result;
            previewSection.classList.add('active');
        };
        reader.readAsDataURL(file);

        try {
            // Check if library is loaded
            if (typeof imglyRemoveBackground === 'undefined') {
                throw new Error('Library penghapus background sedang memuat atau gagal dimuat. Pastikan koneksi internet stabil.');
            }

            // Execute background removal
            // Config can be added: { progress: (p) => console.log(p) }
            const resultBlob = await imglyRemoveBackground(file);
            
            const url = URL.createObjectURL(resultBlob);
            resultPreview.src = url;
            
            // Show actions
            actions.style.display = 'flex';
            downloadBtn.href = url;
            downloadBtn.download = `no-bg_${file.name.replace(/\.[^/.]+$/, "")}.png`;
            
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menghapus background: ' + error.message);
            resetUI();
        } finally {
            loading.style.display = 'none';
        }
    }

    function resetUI() {
        dropZone.style.display = 'block';
        previewSection.classList.remove('active');
        actions.style.display = 'none';
        originalPreview.src = '';
        resultPreview.src = '';
        fileInput.value = '';
        loading.style.display = 'none';
        
        if (downloadBtn.href.startsWith('blob:')) {
            URL.revokeObjectURL(downloadBtn.href);
        }
    }

    resetBtn.addEventListener('click', resetUI);
});
