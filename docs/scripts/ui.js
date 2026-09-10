function setPage(url) {
    window.location.href = url;
}

function addParallaxEffect() {
    const hero = document.querySelector(".home-section");

    if (
        !hero ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    window.addEventListener(
        "scroll",
        () => {
            const offset = window.scrollY * 0.16;
            hero.style.backgroundPositionY = `${offset}px`;
        },
        { passive: true }
    );
}

function addAliceWalking() {
    // Reserved for the existing Alice animation/sprite logic.
}

function addTTSPlayers() {
    const buttons =
        document.getElementsByClassName("tts-button");

    for (const button of buttons) {
        button.addEventListener("click", () => {
            const speech =
                new SpeechSynthesisUtterance(
                    button.parentElement.innerText
                );

            speech.lang = "en-GB";
            speech.pitch = 1.1;

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speech);
        });
    }
}

function addMenuScripts() {
    const topbar =
        document.querySelector(".landing-topbar");

    const menuItems =
        document.querySelectorAll(".menu-item");

    const menuIcon =
        document.getElementById("menu-icon");

    const menuList =
        document.querySelector(".menu-list-items");

    if (!topbar || !menuList) return;

    let toggle =
        topbar.querySelector(".mobile-menu-toggle");

    if (!toggle) {
        toggle =
            document.createElement("button");

        toggle.type = "button";
        toggle.className = "mobile-menu-toggle";

        toggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.innerHTML = "☰";

        topbar.appendChild(toggle);
    }

    toggle.addEventListener("click", () => {
        const open =
            menuList.classList.toggle("open");

        toggle.setAttribute(
            "aria-expanded",
            String(open)
        );

        toggle.innerHTML =
            open ? "✕" : "☰";
    });

    if (menuIcon) {
        menuIcon.addEventListener(
            "click",
            () => setPage("index.html")
        );
    }

    const filename =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const activeId =
        filename === "index.html"
            ? "home"
            : filename.replace(".html", "");

    for (const item of menuItems) {
        if (item.id === activeId) {
            item.classList.add("active");
        }

        item.addEventListener(
            "click",
            () => {
                setPage(`${item.id}.html`);
            }
        );
    }

    document.addEventListener(
        "click",
        event => {
            if (!topbar.contains(event.target)) {
                menuList.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                toggle.innerHTML = "☰";
            }
        }
    );
}

function downloadGramlyApk() {
    const a =
        document.createElement("a");

    a.href =
        "resources/Gramly-Early-Release-V5.apk";

    a.download =
        "Gramly.apk";

    document.body.appendChild(a);

    a.click();

    a.remove();
}

for (
    const footer of
    document.getElementsByClassName("basic-footer")
) {
    const p =
        footer.getElementsByTagName("p")[0];

    if (p) {
        p.innerHTML =
            "© STI COLLEGE LIPA 2026–2027 · MAWD 202 – GROUP 4 · GRAMLY";
    }
}


/* =========================================================
   TRY GRAMLY INTERACTIVE DEMO
   Percentage Input → Grams Output
   ========================================================= */

function initializeGramlyDemo() {

    const ingredientCards =
        document.querySelectorAll(
            ".ingredient-card"
        );

    const dropZone =
        document.getElementById(
            "recipe-drop-zone"
        );

    const resetButton =
        document.getElementById(
            "reset-recipe"
        );

    const flourInput =
        document.getElementById(
            "flour-weight"
        );

    if (!dropZone || !flourInput) {
        return;
    }

    let draggedIngredient = null;


    /* =====================================================
       INGREDIENT DATA
       ===================================================== */

    function getIngredientData(card) {

        return {
            name:
                card.dataset.ingredient,

            icon:
                card.dataset.icon,

            percentage:
                Number(
                    card.dataset.percentage
                ) || 0
        };
    }


    function ingredientCategory(name) {

        const categories = {
            Water: "Liquid",
            Sugar: "Sweetener",
            Butter: "Fat",
            Milk: "Liquid",
            Egg: "Protein",
            Salt: "Seasoning",
            Yeast: "Leavening"
        };

        return (
            categories[name] ||
            "Ingredient"
        );
    }


    /* =====================================================
       DRAG / CLICK INGREDIENTS
       ===================================================== */

    ingredientCards.forEach(card => {

        card.addEventListener(
            "dragstart",
            () => {

                draggedIngredient =
                    getIngredientData(card);

                card.classList.add(
                    "dragging"
                );
            }
        );


        card.addEventListener(
            "dragend",
            () => {

                card.classList.remove(
                    "dragging"
                );

                draggedIngredient = null;
            }
        );


        /* Also allows click-to-add */

        card.addEventListener(
            "click",
            () => {

                addIngredient(
                    getIngredientData(card)
                );
            }
        );

    });


    /* =====================================================
       DROP ZONE
       ===================================================== */

    dropZone.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            dropZone.classList.add(
                "drag-over"
            );
        }
    );


    dropZone.addEventListener(
        "dragleave",
        () => {

            dropZone.classList.remove(
                "drag-over"
            );
        }
    );


    dropZone.addEventListener(
        "drop",
        event => {

            event.preventDefault();

            dropZone.classList.remove(
                "drag-over"
            );

            if (draggedIngredient) {

                addIngredient(
                    draggedIngredient
                );
            }
        }
    );


    /* =====================================================
       ADD INGREDIENT TO RECIPE
       ===================================================== */

    function addIngredient(ingredient) {

        const existing =
            [
                ...dropZone.querySelectorAll(
                    ".recipe-ingredient"
                )
            ].find(
                row =>
                    row.dataset.name ===
                    ingredient.name
            );


        /* Ingredient already exists */

        if (existing) {

            const input =
                existing.querySelector(
                    ".ingredient-percentage"
                );

            if (input) {
                input.focus();
                input.select();
            }

            return;
        }


        const row =
            document.createElement("div");

        row.className =
            "recipe-ingredient";

        row.dataset.name =
            ingredient.name;


        row.innerHTML = `

            <div class="recipe-ingredient-name">

                <span>
                    ${ingredient.icon}
                </span>

                <div>

                    <strong>
                        ${ingredient.name}
                    </strong>

                    <small>
                        ${ingredientCategory(
                            ingredient.name
                        )}
                    </small>

                </div>

            </div>


            <!-- GRAMS OUTPUT -->

            <div class="gram-output">

                <strong
                    class="ingredient-grams"
                >
                    0
                </strong>

                <span>g</span>

            </div>


            <!-- BAKER'S % INPUT -->

            <div class="percentage-control">

                <input
                    type="number"
                    class="ingredient-percentage"
                    value="${ingredient.percentage}"
                    min="0"
                    step="0.1"
                    aria-label="${ingredient.name} Baker's Percentage"
                >

                <span>%</span>

            </div>


            <button
                class="remove-ingredient"
                type="button"
                aria-label="Remove ${ingredient.name}"
            >
                ×
            </button>

        `;


        const emptyMessage =
            document.getElementById(
                "recipe-empty-message"
            );


        if (emptyMessage) {

            dropZone.insertBefore(
                row,
                emptyMessage
            );

        } else {

            dropZone.appendChild(row);
        }


        bindRecipeRow(row);

        calculateRecipe();
    }


    /* =====================================================
       RECIPE ROW EVENTS
       ===================================================== */

    function bindRecipeRow(row) {

        const percentageInput =
            row.querySelector(
                ".ingredient-percentage"
            );


        if (percentageInput) {

            percentageInput.addEventListener(
                "input",
                calculateRecipe
            );
        }


        const removeButton =
            row.querySelector(
                ".remove-ingredient"
            );


        if (removeButton) {

            removeButton.addEventListener(
                "click",
                () => {

                    row.remove();

                    calculateRecipe();
                }
            );
        }
    }


    dropZone
        .querySelectorAll(
            ".recipe-ingredient"
        )
        .forEach(bindRecipeRow);


    /* Flour grams remain the base input */

    flourInput.addEventListener(
        "input",
        calculateRecipe
    );


    /* =====================================================
       CALCULATE GRAMS FROM BAKER'S %
       ===================================================== */

    function calculateRecipe() {

        const flourWeight =
            Math.max(
                0,
                Number(
                    flourInput.value
                ) || 0
            );


        const rows =
            dropZone.querySelectorAll(
                ".recipe-ingredient:not(.flour-row)"
            );


        let totalWeight =
            flourWeight;

        let exampleRow =
            null;


        rows.forEach(row => {

            const percentageInput =
                row.querySelector(
                    ".ingredient-percentage"
                );


            const gramsOutput =
                row.querySelector(
                    ".ingredient-grams"
                );


            const percentage =
                Math.max(
                    0,
                    Number(
                        percentageInput?.value
                    ) || 0
                );


            /*
                FORMULA:

                grams =
                flour grams × percentage / 100

                Example:
                500g × 65 / 100 = 325g
            */

            const grams =
                flourWeight *
                percentage /
                100;


            totalWeight += grams;


            if (gramsOutput) {

                gramsOutput.textContent =
                    formatNumber(
                        grams
                    );
            }


            if (!exampleRow) {

                exampleRow =
                    row;
            }

        });


        /* =================================================
           STATS
           ================================================= */

        const totalWeightDisplay =
            document.getElementById(
                "total-weight"
            );


        const flourDisplay =
            document.getElementById(
                "flour-weight-display"
            );


        const countDisplay =
            document.getElementById(
                "ingredient-count"
            );


        const emptyMessage =
            document.getElementById(
                "recipe-empty-message"
            );


        if (totalWeightDisplay) {

            totalWeightDisplay.textContent =
                `${formatNumber(
                    totalWeight
                )}g`;
        }


        if (flourDisplay) {

            flourDisplay.textContent =
                `${formatNumber(
                    flourWeight
                )}g`;
        }


        if (countDisplay) {

            /*
                +1 because flour is always present
            */

            countDisplay.textContent =
                rows.length + 1;
        }


        if (emptyMessage) {

            emptyMessage.hidden =
                rows.length > 0;
        }


        updateLiveCalculation(
            exampleRow,
            flourWeight
        );
    }


    /* =====================================================
       LIVE CALCULATION DISPLAY
       ===================================================== */

    function updateLiveCalculation(
        row,
        flourWeight
    ) {

        const calculationText =
            document.getElementById(
                "calculation-text"
            );


        const calculationResult =
            document.getElementById(
                "calculation-result"
            );


        if (
            !calculationText ||
            !calculationResult
        ) {
            return;
        }


        if (
            !row ||
            flourWeight <= 0
        ) {

            calculationText.textContent =
                "Add an ingredient and set a percentage.";

            calculationResult.textContent =
                "—";

            return;
        }


        const percentage =
            Math.max(
                0,
                Number(
                    row.querySelector(
                        ".ingredient-percentage"
                    )?.value
                ) || 0
            );


        const grams =
            flourWeight *
            percentage /
            100;


        const name =
            row.dataset.name;


        calculationText.textContent =
            `${formatNumber(
                flourWeight
            )}g × ${formatNumber(
                percentage
            )}% ÷ 100`;


        calculationResult.textContent =
            `${formatNumber(
                grams
            )}g ${name}`;
    }


    /* =====================================================
       NUMBER FORMATTER
       ===================================================== */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "0";
        }


        if (
            Math.abs(
                value -
                Math.round(value)
            ) < 0.01
        ) {

            return String(
                Math.round(value)
            );
        }


        return value
            .toFixed(1)
            .replace(
                /\.0$/,
                ""
            );
    }


    /* =====================================================
       RESET RECIPE
       ===================================================== */

    resetButton?.addEventListener(
        "click",
        () => {

            /*
                Remove everything
                except flour
            */

            dropZone
                .querySelectorAll(
                    ".recipe-ingredient:not(.flour-row)"
                )
                .forEach(
                    row =>
                        row.remove()
                );


            /*
                Reset flour
            */

            flourInput.value =
                500;


            /*
                Restore default water
                at 65%
            */

            addIngredient({
                name: "Water",
                icon: "💧",
                percentage: 65
            });


            calculateRecipe();
        }
    );


    /* Initial calculation */

    calculateRecipe();
}