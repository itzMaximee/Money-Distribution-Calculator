let personCount = 1;

document.getElementById('addPerson').addEventListener('click', function() {
    const peopleDiv = document.getElementById('people');
    
    const newPerson = document.createElement('div');
    newPerson.className = 'person';
    newPerson.innerHTML = `
        <label for="name-${personCount}">Name:</label>
        <input type="text" id="name-${personCount}" value="Person ${personCount + 1}">
        <label for="points-${personCount}">Points:</label>
        <input type="number" id="points-${personCount}" value="1">
    `;
    
    peopleDiv.appendChild(newPerson);
    personCount++;
});

document.getElementById('calculate').addEventListener('click', function() {
    const total = parseFloat(document.getElementById('total').value);
    if (isNaN(total) || total <= 0) {
        alert('Please enter a valid total amount.');
        return;
    }
    
    const people = [];
    for (let i = 0; i < personCount; i++) {
        const name = document.getElementById(`name-${i}`).value;
        const points = parseFloat(document.getElementById(`points-${i}`).value);
        
        if (name && !isNaN(points) && points > 0) {
            people.push({ name, points });
        } else {
            alert('Please enter valid names and points.');
            return;
        }
    }
    
    const totalPoints = people.reduce((sum, person) => sum + person.points, 0);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    people.forEach(person => {
        const share = (person.points / totalPoints) * total;
        const result = document.createElement('div');
        result.textContent = `${person.name}: ${share.toFixed(2)}`;
        resultsDiv.appendChild(result);
    });
});

document.getElementById('wallpaper').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});
