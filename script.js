async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickElement(element) {
    if (element) {
        element.click();
        await sleep(500);  // Adjust time as necessary
    }
}

async function removeJob(button) {
    // Open the dropdown menu
    await clickElement(button);

    // Try to find the "Remove job" button within the dropdown
    const removeButtons = Array.from(document.querySelectorAll("div.artdeco-dropdown__item"));
    const removalButton = removeButtons.find(btn => {
        const spanText = btn.querySelector("span.image-text-lockup__text");
        return spanText && spanText.textContent.trim() === "Remove job";
    });

    // Click to remove the job
    await clickElement(removalButton);
}

async function removeJobsFromPage() {
    const menuButtons = document.querySelectorAll('.artdeco-dropdown__trigger.artdeco-button--muted');
    
    for (const button of menuButtons) {
        await removeJob(button);
    }
}

async function paginateAndRemove() {
    const nextButton = document.querySelector(".artdeco-pagination__button.artdeco-pagination__button--next");
    const jobList = document.querySelectorAll(".artdeco-pagination__indicator");
    const totalPages = Number(jobList[jobList.length - 1].textContent.trim());

    for (let currentPage = 0; currentPage < totalPages; currentPage++) {
        await removeJobsFromPage();

        // Move to the next page if it's not the last page
        if (currentPage < totalPages - 1) {
            await clickElement(nextButton);
            await sleep(4500);  // Adjust waiting time as necessary
        }
    }
}

// Execute the main function
paginateAndRemove();
