const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const name = document.getElementById('name').value;
    const size = document.getElementById('size').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;

    const data = {
        name: name,
        linkedin_url: linkedin,
        github_url: github
    }

    if (name === '') {
        alert('Please enter a user name');
    } else {
        insertData(data);
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(name, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    };
};

const generateQRCode = (name, size) => {
    const qrcode = new QRCode('qrcode', {
        text: name,
        width: size,
        height: size
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();

};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link'
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
