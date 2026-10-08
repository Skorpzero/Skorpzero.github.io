(function () {
    "use strict";

    var quantityPattern = /^[1-9][0-9]*$/;

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

    function showResult(total) {
        var resultElement = document.getElementById("result");
        resultElement.textContent = "Итоговая стоимость: " + total + " ₽";
    }

    function calculateTotal() {
        var quantityField = document.getElementById("quantity");
        var quantityValue = quantityField.value.trim();
        var productSelect = document.getElementById("product");
        var selectedOption = productSelect.options[productSelect.selectedIndex];
        var price;
        var quantity;
        var total;

        if (!quantityPattern.test(quantityValue)) {
            showError("Введите количество товара целым положительным числом без букв и других символов.");
            return;
        }

        hideError();

        quantity = parseInt(quantityValue, 10);
        price = parseInt(selectedOption.getAttribute("data-price"), 10);
        total = quantity * price;

        showResult(total);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var calcButton = document.getElementById("calc-btn");
        calcButton.addEventListener("click", calculateTotal);
    });

}());
