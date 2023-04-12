const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const name = document.getElementById('name').value;
    const size = document.getElementById('size').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const url = "http://127.0.0.1:5500/Perfil.html?name=" + name;

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

            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    };
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
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

async function insertData(data) {

    const {error} = await _supabase.from("users").insert([data]);
    
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Dados salvos com sucessor!");
    }
}
