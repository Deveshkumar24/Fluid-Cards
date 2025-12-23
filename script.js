document.addEventListener('DOMContentLoaded', () => {
        ////DOM ELEMENTS
        const cardsWrapper = document.querySelector('.cards-wrapper');
        const modal = document.getElementById('form-modal');
        const addNoteBtn = document.getElementById('add-note-btn');
        const closeModalBtn = document.getElementById('close-form-btn');
        const newCallForm = document.getElementById('new-call-form');
        const upBtn = document.getElementById('up-btn');
        const downBtn = document.getElementById('down-btn');

        ////FUNCTIONS
        
        const updateCardStyles = () => {
            const cards = cardsWrapper.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                if (index === 0) {
                    card.style.transform = 'translateY(0px) scale(1)';
                    card.style.zIndex = '3';
                } else if (index === 1) {
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    card.style.zIndex = '2';
                } else if (index === 2) {
                    card.style.transform = 'translateY(40px) scale(0.9)';
                    card.style.zIndex = '1';
                } else {
                    card.style.transform = 'translateY(60px) scale(0.85)';
                    card.style.zIndex = '0';
                    card.style.opacity = '0'; // Hide cards beyond the third one
                    card.style.visibility = 'hidden';
                }
            });
        };
        
        const reformatInitialCards = () => {
            const cards = cardsWrapper.querySelectorAll('.card');
            cards.forEach(card => {
                const profileName = card.querySelector('.profile h2');
                const details = card.querySelector('.details');
                // Only reformat if the old structure exists
                if (profileName && details) {
                    const name = profileName.innerText;
                    const imgSrc = card.querySelector('.profile img').src;
                    const town = details.querySelectorAll('p')[2].innerText;
                    
                    // Create and set the new simplified content
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

        ////MODAL LOGIC 
        const openModal = () => modal.classList.add('visible');
        const closeModal = () => {
            modal.classList.remove('visible');
            newCallForm.reset(); 
        };

        addNoteBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        ////  FORM SUBMISSION LOGIC 
        newCallForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(newCallForm);
            
            // new card element with new structure
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
            
            // add new card to the top
            cardsWrapper.prepend(newCard);
            
            // Close modal and update styles
            closeModal();
            updateCardStyles();
        });

        ////CARD CYCLING LOGIC
        
        // Move top card to bottom
        upBtn.addEventListener('click', () => {
            const cards = cardsWrapper.querySelectorAll('.card');
            if (cards.length > 1) {
                cardsWrapper.appendChild(cardsWrapper.firstElementChild);
                updateCardStyles();
            }
        });
        
        // Move bottom card to top
        downBtn.addEventListener('click', () => {
             const cards = cardsWrapper.querySelectorAll('.card');
            if (cards.length > 1) {
                cardsWrapper.prepend(cardsWrapper.lastElementChild);
                updateCardStyles();
            }
        });

        ////INITIALIZE THE APP 
        reformatInitialCards();
        updateCardStyles();
    });