document.addEventListener("DOMContentLoaded", function () {  

    const daysElement = document.querySelector("#calendar-days");
    const selectMonth = document.querySelector("#select-month");
    const selectYear = document.querySelector("#select-year");


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
        const selectedMonth = selectMonth.value;
        const selectedYear = selectYear.value;

        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();

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
            displaySavedInfo(dayNumber);
        } else {
            displayPopup(dayNumber, dayElement);
        }
    }

    function displayPopup(dayNumber, dayElement) {
        document.getElementById('main-content').classList.add("blur");
        
        const popupElement = document.createElement("div");
        popupElement.classList.add("popup");
        popupElement.classList
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

                <button type="button" id="submitButton" class="submit-button">Enviar</button>
                <button type="reset" class="close-button">Cancelar</button>
            </form>
            `;

        popupElement.appendChild(popupContent)
        document.body.appendChild(popupElement);
        document.querySelector('.close-button').addEventListener('click', closePopup);
        
        const enviarButton = document.querySelector('#submitButton');
        enviarButton.addEventListener('click', function() {
            const name = document.querySelector("#name").value
            const time = document.querySelector("#time").value
            const valueToPay = document.querySelector("#value").value
            const paidValue = document.querySelector("#value2").value

            console.log(name, time, valueToPay, paidValue)

            localStorage.setItem(dayNumber, JSON.stringify({
                name: name,
                startTime: time,
                remaining: valueToPay,
                alreadyPaid: paidValue
            }))

            dayElement.classList.add("day-selected")
            closePopup()
        });
    }

    function displaySavedInfo(dayNumber) {
        const info = JSON.parse(localStorage.getItem(dayNumber))

        const popupElement = document.createElement("div");
        popupElement.classList.add("popup");
        popupElement.classList
        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");  
        popupContent.innerHTML = `
        <p>${dayNumber}</p>
        <h1> Nome: ${info.name}</h1>
        <p>Horário: ${info.startTime}</p>
        <p>Valor para pagar: $${info.remaining}</p>
        <p>Valor pago: $${info.alreadyPaid}</p>`
        popupElement.appendChild(popupContent)
        document.body.appendChild(popupElement);
    }

    function closePopup() {
        // Remove a classe de desfoque da div de conteúdo principal
        document.getElementById('main-content').classList.remove('blur');
        const popupElement = document.querySelector('.popup');
        document.body.removeChild(popupElement);
    }
}
);
