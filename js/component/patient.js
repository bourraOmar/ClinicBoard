export function patientPage() {
    let patients = JSON.parse(localStorage.getItem('clinicApp:patients')) || [];

    return `
    <div class="patient-container">
      <h2>Patient Management</h2>

      <form class="patient-form" id="patient-form">
        <input type="text" placeholder="Full Name" id="name" required>
        <input type="text" placeholder="Phone" id="phone" required>
        <input type="email" placeholder="Email" id="email">
        <input type="text" placeholder="Notes" id="notes">
        <button type="submit">Add Patient</button>
      </form>

      <input type="text" id="search-input" placeholder="Search by name or phone" class="search-input">

      <table class="patient-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="patient-tbody">
          ${patients.map((p, i) => `
            <tr data-index="${i}">
              <td>${i + 1}</td>
              <td>${p.name}</td>
              <td>${p.phone}</td>
              <td>${p.email}</td>
              <td>${p.notes || ''}</td>
              <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `;
}

export function initPatientPage() {
    const form = document.getElementById('patient-form');
    const tbody = document.getElementById('patient-tbody');
    const searchInput = document.getElementById('search-input');
    let patients = JSON.parse(localStorage.getItem('clinicApp:patients')) || [];

    function renderTable(filtered = null) {
        const list = filtered || patients;
        tbody.innerHTML = list.map((p, i) => `
          <tr data-index="${i}">
            <td>${i + 1}</td>
            <td>${p.name}</td>
            <td>${p.phone}</td>
            <td>${p.email}</td>
            <td>${p.notes || ''}</td>
            <td>
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </td>
          </tr>
        `).join('');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const notes = document.getElementById('notes').value.trim();

        if (!name || !phone) return alert('Name and phone are required');

        patients.push({ name, phone, email, notes });
        localStorage.setItem('clinicApp:patients', JSON.stringify(patients));
        renderTable();
        form.reset();
    });

    tbody.addEventListener('click', (e) => {
        const tr = e.target.closest('tr');
        const index = tr.dataset.index;

        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure to delete this patient?')) {
                patients.splice(index, 1);
                localStorage.setItem('clinicApp:patients', JSON.stringify(patients));
                renderTable();
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const patient = patients[index];
            document.getElementById('name').value = patient.name;
            document.getElementById('phone').value = patient.phone;
            document.getElementById('email').value = patient.email;
            document.getElementById('notes').value = patient.notes || '';

            patients.splice(index, 1);
            renderTable();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = patients.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.phone.includes(term)
        );
        renderTable(filtered);
    });
}