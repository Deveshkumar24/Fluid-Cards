document.addEventListener('DOMContentLoaded', () => {
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const modal = document.getElementById('form-modal');
    const addNoteBtn = document.getElementById('add-note-btn');
    const closeModalBtn = document.getElementById('close-form-btn');
    const newCallForm = document.getElementById('new-call-form');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');

    // Cards ki stack appearance update karne ke liye
    const updateCardStyles = () => {
        const cards = cardsWrapper.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index === 0) {
                card.style.transform = 'translateY(0px) scale(1)';
                card.style.zIndex = '3';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            } else if (index === 1) {
                card.style.transform = 'translateY(20px) scale(0.95)';
                card.style.zIndex = '2';
                card.style.opacity = '0.8';
                card.style.visibility = 'visible';
            } else if (index === 2) {
                card.style.transform = 'translateY(40px) scale(0.9)';
                card.style.zIndex = '1';
                card.style.opacity = '0.6';
                card.style.visibility = 'visible';
            } else {
                card.style.transform = 'translateY(60px) scale(0.8)';
                card.style.zIndex = '0';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });
    };

    // Purane HTML structure ko naye dynamic structure mein badalne ke liye
    const reformatInitialCards = () => {
        const cards = cardsWrapper.querySelectorAll('.card');
        cards.forEach(card => {
            const profileName = card.querySelector('.profile h2');
            const details = card.querySelector('.details');
            if (profileName && details) {
                const name = profileName.innerText;
                const imgSrc = card.querySelector('.profile img').src;
                const town = details.querySelectorAll('p')[2]?.innerText || "Unknown";
                
                card.innerHTML = `
                    <div class="profile">
                      <img src="${imgSrc}" alt="Profile">
                      <h2>${name}</h2>
                    </div>
                    <div class="card-body">
                        <p><strong>Town:</strong> ${town}</p>
                        <p><strong>Purpose:</strong> Pre-loaded contact.</p>
                        <p><strong>Category:</strong> No Rush</p>
                    </div>
                `;
            }
        });
    };

    // Modal Control
    addNoteBtn.onclick = () => modal.classList.add('visible');
    closeModalBtn.onclick = () => {
        modal.classList.remove('visible');
        newCallForm.reset();
    };

    // Form Submit
    newCallForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(newCallForm);
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <div class="profile">
              <img src="${formData.get('imageUrl')}" alt="Profile">
              <h2>${formData.get('fullName')}</h2>
            </div>
            <div class="card-body">
                <p><strong>Town:</strong> ${formData.get('homeTown')}</p>
                <p><strong>Purpose:</strong> ${formData.get('purpose')}</p>
                <p><strong>Category:</strong> ${formData.get('category')}</p>
            </div>
        `;
        cardsWrapper.prepend(newCard);
        modal.classList.remove('visible');
        newCallForm.reset();
        updateCardStyles();
    };

    // Navigation
    upBtn.onclick = () => {
        if (cardsWrapper.children.length > 1) {
            cardsWrapper.appendChild(cardsWrapper.firstElementChild);
            updateCardStyles();
        }
    };

    downBtn.onclick = () => {
        if (cardsWrapper.children.length > 1) {
            cardsWrapper.prepend(cardsWrapper.lastElementChild);
            updateCardStyles();
        }
    };

    reformatInitialCards();
    updateCardStyles();
});