    // Filtrování tabulky
    document.getElementById('filterInput').addEventListener('input', function () {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll('#dataTable tr');
      rows.forEach(row => {
        const city = row.children[1].textContent.toLowerCase();
        row.style.display = city.includes(filter) ? '' : 'none';
      });
    });

    // Filtrování výběrového menu
    document.getElementById('selectFilter').addEventListener('input', function () {
      const filter = this.value.toLowerCase();
      const options = document.querySelectorAll('#citySelect option');
      options.forEach(option => {
        option.style.display = option.textContent.toLowerCase().includes(filter) ? '' : 'none';
      });
    });

    // Zpracování formuláře
    document.getElementById('cityForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const selectedCity = document.getElementById('citySelect').value;
      alert('Vybral jsi: ' + selectedCity);
    });