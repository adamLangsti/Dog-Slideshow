// fetch all dog breeds
const loadBreed = async (breed) => {
    if (breed != 'Choose a dog breed') {
        const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images`
        );
        const responseJson = await response.json();
        // pass breedimages as parameter to new function
        createSlideshow(responseJson.message);
    }
};

const createSlideshow = (images) => {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);

    if (images.length > 1) {
        document.getElementById(
            'slideshow'
        ).innerHTML = `<div class="slide" style="background-image: url('${images[0]}')" />
        <div class="slide" style="background-image: url('${images[1]}')" />
        `;
        currentPosition += 2;
        if(images.length === 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000);
    } else {
        document.getElementById(
            'slideshow'
        ).innerHTML = `<div class="slide" style="background-image: url('${images[0]}')" /><div class="slide" />
        `;
    }

    const nextSlide = () => {
        document
            .getElementById('slideshow')
            .insertAdjacentHTML(
                'beforeend',
                `<div class="slide" style="background-image: url('${images[currentPosition]}')" />`
            );
        deleteFirstPhotoDelay = setTimeout(() => {
            document.querySelector('.slide').remove();
        }, 1000);
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    };
};
