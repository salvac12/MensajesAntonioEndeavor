// Global variables
let messagesData = [];
const EXCEL_FILE = 'Mensajes_Antonio_limpio.xlsx';

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const messagesGridEl = document.getElementById('messages-grid');
const selectorEl = document.getElementById('message-selector');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadExcelData();
});

/**
 * Load and parse Excel file using SheetJS
 */
async function loadExcelData() {
    try {
        showLoading();

        // Fetch the Excel file
        const response = await fetch(EXCEL_FILE);

        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo ${EXCEL_FILE}. Asegúrate de que está en la misma carpeta que index.html`);
        }

        // Read the file as array buffer
        const arrayBuffer = await response.arrayBuffer();

        // Parse with SheetJS
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        // Process data
        messagesData = processMessages(rawData);

        if (messagesData.length === 0) {
            throw new Error('No se encontraron mensajes válidos en el archivo Excel');
        }

        // Render messages and populate selector
        renderMessages();
        populateSelector();

        hideLoading();
        showMessages();

    } catch (error) {
        console.error('Error loading Excel:', error);
        showError(error.message);
    }
}

/**
 * Process and filter raw Excel data
 * Supports both Spanish (Nombre, Apellido, Mensaje) and English (name, surname, message) column names
 */
function processMessages(rawData) {
    return rawData
        .filter(row => {
            // Check for message in both Spanish and English
            const message = row.Mensaje || row.mensaje || row.message || row.Message;
            return message && String(message).trim() !== '';
        })
        .map((row, index) => {
            // Get values from either Spanish or English column names
            const nombre = row.Nombre || row.nombre || row.name || row.Name;
            const apellido = row.Apellido || row.apellido || row.surname || row.Surname;
            const mensaje = row.Mensaje || row.mensaje || row.message || row.Message;

            return {
                id: `message-${index}`,
                fullName: getFullName(nombre, apellido),
                message: String(mensaje).trim(),
                initials: getInitials(nombre, apellido)
            };
        })
        .sort((a, b) => a.fullName.localeCompare(b.fullName, 'es'));
}

/**
 * Get full name from name and surname
 */
function getFullName(name, surname) {
    const firstName = name ? String(name).trim() : '';
    const lastName = surname ? String(surname).trim() : '';
    return `${firstName} ${lastName}`.trim() || 'Anónimo';
}

/**
 * Get initials from name and surname
 */
function getInitials(name, surname) {
    const firstName = name ? String(name).trim() : '';
    const lastName = surname ? String(surname).trim() : '';

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial + lastInitial || '?';
}

/**
 * Render all message cards
 */
function renderMessages() {
    messagesGridEl.innerHTML = '';

    messagesData.forEach(message => {
        const card = createMessageCard(message);
        messagesGridEl.appendChild(card);
    });
}

/**
 * Create a message card element
 */
function createMessageCard(message) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.id = message.id;

    // Card header with avatar and name
    const header = document.createElement('div');
    header.className = 'card-header';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = message.initials;

    const name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = message.fullName;

    header.appendChild(avatar);
    header.appendChild(name);

    // Card message
    const messageText = document.createElement('div');
    messageText.className = 'card-message';
    messageText.textContent = message.message;

    // Append to card
    card.appendChild(header);
    card.appendChild(messageText);

    return card;
}

/**
 * Populate the selector dropdown
 */
function populateSelector() {
    selectorEl.innerHTML = '<option value="">-- Selecciona un nombre --</option>';

    messagesData.forEach(message => {
        const option = document.createElement('option');
        option.value = message.id;
        option.textContent = message.fullName;
        selectorEl.appendChild(option);
    });

    // Enable selector
    selectorEl.disabled = false;

    // Add event listener
    selectorEl.addEventListener('change', handleSelectorChange);
}

/**
 * Handle selector change event
 */
function handleSelectorChange(event) {
    const selectedId = event.target.value;

    if (!selectedId) {
        // Clear all highlights
        document.querySelectorAll('.message-card').forEach(card => {
            card.classList.remove('highlighted');
        });
        return;
    }

    // Scroll to and highlight selected message
    scrollToMessage(selectedId);
}

/**
 * Scroll to specific message and highlight it
 */
function scrollToMessage(messageId) {
    const targetCard = document.getElementById(messageId);

    if (!targetCard) return;

    // Remove previous highlights
    document.querySelectorAll('.message-card').forEach(card => {
        card.classList.remove('highlighted');
    });

    // Add highlight to target
    targetCard.classList.add('highlighted');

    // Smooth scroll to card
    targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Remove highlight after animation
    setTimeout(() => {
        targetCard.classList.remove('highlighted');
    }, 3000);
}

/**
 * Show loading state
 */
function showLoading() {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    messagesGridEl.classList.add('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingEl.classList.add('hidden');
}

/**
 * Show messages grid
 */
function showMessages() {
    messagesGridEl.classList.remove('hidden');
}

/**
 * Show error state
 */
function showError(message) {
    loadingEl.classList.add('hidden');
    messagesGridEl.classList.add('hidden');
    errorMessageEl.textContent = message;
    errorEl.classList.remove('hidden');
}

// Add smooth scrolling for browsers that don't support it natively
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}
