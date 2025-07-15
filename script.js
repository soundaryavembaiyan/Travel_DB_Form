
// function showToast(message = 'Submitted successfully!') {
//     const toast = document.getElementById("toast");
//     toast.textContent = message;
//     toast.className = "toast show";
//     setTimeout(() => {
//         toast.className = toast.className.replace("show", "");
//     }, 3000); // Hide after 3 seconds
// }

// function handleSubmit(event) {
//     event.preventDefault();
//     showToast("Thank you! We’ll contact you soon.");
//     event.target.reset();
// }

// function showToast(message = 'Submitted successfully!', isError = false) {
//     const toast = document.getElementById("toast");
//     toast.textContent = message;
//     toast.className = "toast show" + (isError ? " error" : "");
//     setTimeout(() => {
//         toast.className = "toast"; // Reset classes
//     }, 3000);
// }

function showToast(message = 'Submitted successfully!', isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("error");
    toast.classList.add("show");

    if (isError) {
        toast.classList.add("error");
    }

    // Force visibility on
    toast.style.visibility = 'visible';

    setTimeout(() => {
        toast.classList.remove("show", "error");
        toast.style.visibility = 'hidden';
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("queryForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch("submit.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data["Query form submitted!"]) {
                    showToast("Thank you! We’ll contact you soon.");
                    this.reset();
                } else {
                    showToast("Error: " + (data.error || "Unknown error"), true);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showToast("Submission failed please try again !!", true);
            });
    });
});

