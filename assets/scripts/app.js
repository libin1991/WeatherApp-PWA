// add service worker 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(reg => console.log('ServiceWorker registered', reg))
        .then(function () { console.log('Service Worker Registered'); })
        .catch(error => console.log('ServiceWorker not registered', error));;
}
//--------------

// add to home screen
let deferredPrompt, btnInstall = document.querySelector("#btnInstall"),
    btnGetJobs = document.querySelector("#btnGetJobs"),
    myAction = document.querySelector("#my-action"),
    enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log("beforeinstallprompt");
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    btnInstall.removeAttribute("hidden");
});
btnInstall.addEventListener("click", function () {
    btnInstall.setAttribute("hidden", ""),
        deferredPrompt.prompt(),
        deferredPrompt.userChoice.then(function (t) {
            if ("accepted" === t.outcome) {
                console.log("User accepted the A2HS prompt")
            } else {
                console.log("User dismissed the A2HS prompt")
            }
            deferredPrompt = null
        });
});
// //--------------
// btnGetJobs.addEventListener("click", function () {
//     fetch('http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=%22software%22')
//         .then(function (response) {
//             console.log(response.json());
//         });
// });



function askForNotificationPermission() {
    Notification.requestPermission(function (result) {
        console.log('User Choice', result);
        if (result !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            // Hide the button
            displayConfirmationNotification();
        }
    });
}

function displayConfirmationNotification() {
    console.log('Successfully subscribed');
    let options = {
        body: 'Born: 7 July 1981\nLocation: Ranchi,India\nYou are Legend!',
        icon: './assets/icons/ms.jpg'
    };
    // new Notification("Happy Birthday! MS Dhoni", options);
    navigator.serviceWorker.ready.then(function (registeration) {
        registeration.showNotification("Happy Birthday! MS Dhoni", options);
    });
}


if ('Notification' in window) {
    console.log('Notification suppported!');

    for (var i = 0; i < enableNotificationsButtons.length; i++) {
        enableNotificationsButtons[i].style.display = 'inline-block';
        enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
    }
}
