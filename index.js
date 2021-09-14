let timer;
let deleteFirstPhotoDelay;

// Fetch dog array
const fetchAllDogsData = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const responseJson = await response.json();
        // Pass dogarray to new function as parameter with message property as dog object
        createBreedList(responseJson.message);
    } catch (error) {
        console.error(`Couldn't load images... ${error}`);
    }
};

fetchAllDogsData();

//  Loop over array of dogs and display in a select element
const createBreedList = (breedList) => {
    document.getElementById('breed').innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map((breed) => {
            return `<option>${breed}</option>`;
        })}
    </select>
    `;
};

// Load breed images
const loadByBreed = async (breed) => {
    if (breed != 'Choose a dog breed') {
        const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images`
        );
        const responseJson = await response.json();
        createSlideShow(responseJson.message);
    }
};

// Show dog image in slideshow
const createSlideShow = (images) => {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);

    if (images.length > 1) {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>`;

        currentPosition += 2;
        if (images.length === 2) currentPosition = 0;
        timer = setInterval(nextSlide, 3000);
    } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>`;
    }

    function nextSlide() {
        document
            .getElementById('slideshow')
            .insertAdjacentHTML(
                'beforeend',
                `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
            );
        deleteFirstPhotoDelay = setTimeout(() => {
            document.querySelector('.slide').remove();
        }, 1000);
        currentPosition + 1 > images.length
            ? (currentPosition = 0)
            : currentPosition++;
    }
};
