document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const controls = document.getElementById('controls');
    const previewSection = document.getElementById('preview-section');
    const actions = document.getElementById('actions');
    const qualityInput = document.getElementById('quality');
    const qualityVal = document.getElementById('quality-val');
    const originalPreview = document.getElementById('original-preview');
    const optimizedPreview = document.getElementById('optimized-preview');
    const originalSize = document.getElementById('original-size');
    const optimizedSize = document.getElementById('optimized-size');
    const savingsPct = document.getElementById('savings-pct');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loading = document.getElementById('loading');

    let currentFile = null;
    let originalImage = null;

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

    // Handle File Processing
    function handleFile(file) {
        if (!file.type.match('image/png')) {
            alert('Silakan pilih file gambar PNG!');
            return;
        }

        currentFile = file;
        loading.style.display = 'block';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                originalPreview.src = e.target.result;
                originalSize.textContent = `Ukuran: ${formatBytes(file.size)}`;
                
                // Show UI components
                controls.classList.add('active');
                previewSection.classList.add('active');
                actions.style.display = 'flex';
                dropZone.style.display = 'none';
                
                processImage();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Process & Convert Image
    function processImage() {
        if (!originalImage) return;

        const quality = qualityInput.value / 100;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            optimizedPreview.src = url;
            optimizedSize.textContent = `Ukuran: ${formatBytes(blob.size)}`;
            
            // Calculate savings
            const savings = ((currentFile.size - blob.size) / currentFile.size * 100).toFixed(1);
            savingsPct.textContent = savings > 0 ? `-${savings}%` : `+${Math.abs(savings)}%`;
            savingsPct.style.color = savings > 0 ? 'var(--success)' : '#ef4444';

            // Prepare download link
            downloadBtn.href = url;
            downloadBtn.download = `${currentFile.name.replace(/\.[^/.]+$/, "")}_pixelshrink.webp`;
            
            loading.style.display = 'none';
        }, 'image/webp', quality);
    }

    // Quality Slider Update
    qualityInput.addEventListener('input', () => {
        qualityVal.textContent = `${qualityInput.value}%`;
    });

    qualityInput.addEventListener('change', () => {
        loading.style.display = 'block';
        processImage();
    });

    // Reset Functionality
    resetBtn.addEventListener('click', () => {
        currentFile = null;
        originalImage = null;
        fileInput.value = '';
        
        controls.classList.remove('active');
        previewSection.classList.remove('active');
        actions.style.display = 'none';
        dropZone.style.display = 'block';
        
        originalPreview.src = '';
        optimizedPreview.src = '';
        
        // Clean up object URLs
        if (downloadBtn.href.startsWith('blob:')) {
            URL.revokeObjectURL(downloadBtn.href);
        }
    });

    // Helper: Format Bytes
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});
