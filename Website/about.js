const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault(); // supaya tidak scroll loncat

        // hapus active dari semua tab & content
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // tambahkan active ke tab yang diklik
        this.classList.add('active');

        // ambil id dari href
        const target = this.getAttribute('href').substring(1);

        // tampilkan section sesuai id
        document.getElementById(target).classList.add('active');
    });
});
