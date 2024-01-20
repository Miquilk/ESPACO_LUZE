document.addEventListener("DOMContentLoaded", function () {  

    const daysElement = document.getElementById("calendar-days");
    const selectMonth = document.getElementById("select-month");
    const selectYear = document.getElementById("select-year");


    updateMonthYear();

    updateCalendar();

    //firebase.initializeApp(firebaseConfig);
    selectMonth.addEventListener("change", updateCalendar);
    selectYear.addEventListener("change", updateCalendar);


    function updateMonthYear() {
        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];    

        for (let i = 0; i < months.length; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = months[i];
            selectMonth.appendChild(option);
        }

        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 10; year <= currentYear + 10; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            selectYear.appendChild(option);        
        }

        const currentMonth = new Date().getMonth();
        selectMonth.value = currentMonth;
        selectYear.value = currentYear;
    } 

    function updateCalendar() {
        daysElement.innerHTML ="";
        const selectedMonth = parseInt(selectMonth.value);
        const selectedYear = parseInt(selectYear.value);

        currentMonth = selectedMonth;
        currentYear = selectedYear;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            daysElement.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDay; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.id = `day-${i}`;
            dayElement.textContent = i;

            dayElement.onclick = function() {
                checkAndDisplayInfo(i);
            };

            daysElement.appendChild(dayElement);
            
        };
    }

    function checkAndDisplayInfo(dayNumber) {
        const dayElement = document.getElementById(`day-${dayNumber}`);

        if (dayElement.classList.contains("day-selected")) {
            displaySavedInfo(savedData[dayKey]);
        } else {
            displayPopup(dayNumber);
        }
    }

    function displayPopup(dayNumber) {
        document.getElementById('main-content').classList.add('blur');
        //const popupContainer = document.createElement("div");

        const popupElement = document.createElement("div");
        popupElement.classList.add("popup");
        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");   
        
        popupContent.innerHTML = `
            <form id="myForm">
                <label for="name">Nome:</label>
                <input type="text" id="name" name="name" required>

                <label for="time">Horário inicial:</label>
                <input type="text" id="time" name="time" required>

                <label for="value">Valor:</label>
                <input type="text" id="value" name="value" required>

                <label for="value2">Haver:</label>
                <input type="text" id="value2" name="value" required>

                <button type="button" id="submitButton" class="submit-button" onclick="submitForm()">Enviar</button>
                <button type="reset" class="close-button" onclick="closePopup()">Cancelar</button>
            </form>
            `;

        popupElement.appendChild(popupContent)
        document.body.appendChild(popupElement);
        document.querySelector('.close-button').addEventListener('click', closePopup);
        
        const enviarButton = document.querySelector('.submit-button');
        enviarButton.addEventListener('click', function() {
            submitForm(dayNumber);
        });
    }

    function closePopup() {
        // Remove a classe de desfoque da div de conteúdo principal
       document.getElementById('main-content').classList.remove('blur');
       const popupElement = document.querySelector('.popup');
        document.body.removeChild(popupElement);
    }

    function submitForm(dayNumber) {
        // var name = document.getElementById('name').value;
        // var time = document.getElementById('time').value;
        // var value = document.getElementById('value').value;
        // var value2 = document.getElementById('value2').value;
      
        // // Referência para o nó 'forms' no Firebase Realtime Database
        // var formsRef = firebase.database().ref('forms');
      
        // // Adiciona um novo nó com os dados do formulário
        // formsRef.push({
        //   day_Number: dayNumber,
        //   name: name,
        //   time: time,
        //   value: value,
        //   value2: value2
        // });
      
        // Feche o popup após o envio do formulário
        closePopup();
      }
      
    
    









}

    
);
