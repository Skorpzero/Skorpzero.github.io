(function () {
    "use strict";

    var quantityPattern = /^[1-9][0-9]*$/;

    var services = {
        landing: {
            price: 15000,
            options: [],
            property: null
        },
        shop: {
            price: 40000,
            options: [
                {name: "Базовый тариф", price: 0},
                {name: "Расширенный тариф", price: 15000},
                {name: "Премиум тариф", price: 30000}
            ],
            property: null
        },
        support: {
            price: 5000,
            options: [],
            property: {name: "Срочная поддержка 24/7", price: 3000}
        }
    };

    function getSelectedService() {
        var checked = document.querySelector("input[name='service']:checked");
        return services[checked.value];
    }

    function showError(message) {
        var errorElement = document.getElementById("error-message");
        var resultElement = document.getElementById("result");
        errorElement.textContent = message;
        errorElement.hidden = false;
        resultElement.textContent = "";
    }

    function hideError() {
        var errorElement = document.getElementById("error-message");
        errorElement.textContent = "";
        errorElement.hidden = true;
    }

    function fillOptions(service) {
        var select = document.getElementById("option-select");
        var index;
        var item;

        select.textContent = "";

        for (index = 0; index < service.options.length; index += 1) {
            item = document.createElement("option");
            item.value = String(index);
            item.textContent = service.options[index].name + " (+" +
                    service.options[index].price.toLocaleString("ru-RU") +
                    " ₽)";
            select.appendChild(item);
        }
    }

    function updateVisibility() {
        var service = getSelectedService();
        var optionBlock = document.getElementById("option-block");
        var propertyBlock = document.getElementById("property-block");
        var propertyCheck = document.getElementById("property-check");
        var propertyLabel = document.getElementById("property-label");
        var hasOptions = service.options.length > 0;
        var hasProperty = service.property !== null;

        optionBlock.hidden = !hasOptions;
        propertyBlock.hidden = !hasProperty;
        propertyCheck.checked = false;

        if (hasOptions) {
            fillOptions(service);
        }

        if (hasProperty) {
            propertyLabel.textContent = service.property.name + " (+" +
                    service.property.price.toLocaleString("ru-RU") +
                    " ₽)";
        }
    }

    function calculate() {
        var service = getSelectedService();
        var quantityValue = document.getElementById("quantity").value.trim();
        var select = document.getElementById("option-select");
        var propertyCheck = document.getElementById("property-check");
        var unitPrice = service.price;
        var total;

        if (!quantityPattern.test(quantityValue)) {
            showError("Введите целое положительное число без букв и знаков.");
            return;
        }

        hideError();

        if (service.options.length > 0) {
            unitPrice += service.options[select.selectedIndex].price;
        }

        if (service.property !== null && propertyCheck.checked) {
            unitPrice += service.property.price;
        }

        total = parseInt(quantityValue, 10) * unitPrice;

        document.getElementById("result").textContent =
                "Стоимость: " + total.toLocaleString("ru-RU") + " ₽";
    }

    function onFormChange(event) {
        if (event.target.name === "service") {
            updateVisibility();
        }
        calculate();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("calc-form");

        form.addEventListener("input", onFormChange);
        form.addEventListener("change", onFormChange);
        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });

        updateVisibility();
        calculate();
    });

}());
