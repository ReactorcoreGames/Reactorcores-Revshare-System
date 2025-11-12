/**
 * Reactorcore's Revenue Share System - Main JavaScript
 * Handles tab navigation and interactive features
 */

// ========================================
// TAB NAVIGATION
// ========================================

/**
 * Initialize tab navigation system
 */
function initTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add click event listeners to all navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab, navButtons, tabContents);
        });
    });
}

/**
 * Switch to a specific tab
 * @param {string} tabId - The ID of the tab to switch to
 * @param {NodeList} navButtons - All navigation buttons
 * @param {NodeList} tabContents - All tab content sections
 */
function switchTab(tabId, navButtons, tabContents) {
    // Remove active class from all buttons
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Remove active class from all tab contents
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Show corresponding tab content
    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) {
        activeTab.classList.add('active');

        // Scroll to top of content smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize burger menu for mobile navigation
 */
function initBurgerMenu() {
    const burgerBtn = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navButtons = document.querySelectorAll('.nav-btn');

    if (!burgerBtn || !navMenu) return;

    // Toggle menu on burger button click
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav button
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit how often a function can run
 * Useful for resize and scroll events
 * @param {Function} func - The function to debounce
 * @param {number} wait - Time to wait in milliseconds
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle responsive navbar behavior on scroll
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
        }

        lastScroll = currentScroll;
    }, 50));
}

// ========================================
// FILE STATUS INTERACTION
// ========================================

/**
 * Initialize file status click/tap interaction
 * Both Desktop and Mobile: Click/Tap to toggle between square and expanded
 */
function initFileStatusInteraction() {
    const fileStatus = document.getElementById('file-status');
    if (!fileStatus) return;

    // Click/Tap to toggle minimized state (works on both desktop and mobile)
    fileStatus.addEventListener('click', () => {
        fileStatus.classList.toggle('minimized');
    });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab navigation
    initTabNavigation();

    // Initialize burger menu for mobile
    initBurgerMenu();

    // Initialize navbar scroll behavior
    handleNavbarScroll();

    // Initialize file status hover/tap behavior
    initFileStatusInteraction();

    // Initialize file management system (save/load/drag-drop)
    initFileManagement();

    // Initialize Team & Credits tab
    initTeamTab();

    // Initialize Payout Calculator tab
    initCalculatorTab();

    // Initialize History tab
    initDashboardTab();

    // Log initialization
    console.log('Reactorcore Revenue Share System initialized successfully');
    console.log('Version: 1.0.0');
    console.log('Burger Menu ready');
    console.log('File Management ready');
    console.log('Team & Credits tab ready');
    console.log('Payout Calculator tab ready');
    console.log('History tab ready');
});

// ========================================
// DATA MANAGEMENT
// ========================================

/**
 * Application data structure
 */
const AppData = {
    project: {
        name: '',
        description: ''
    },
    members: [],
    payouts: []
};

/**
 * Save data to localStorage
 */
function saveData() {
    try {
        localStorage.setItem('revshare_data', JSON.stringify(AppData));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

/**
 * Load data from localStorage
 */
function loadData() {
    try {
        const saved = localStorage.getItem('revshare_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            AppData.project = parsed.project || AppData.project;
            AppData.members = parsed.members || AppData.members;
            AppData.payouts = parsed.payouts || AppData.payouts;
            return true;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
    return false;
}

// ========================================
// TEAM & CREDITS TAB
// ========================================

/**
 * Initialize Team & Credits tab functionality
 */
function initTeamTab() {
    // Load existing data
    loadData();

    // Initialize project info
    initProjectInfo();

    // Initialize member form
    initMemberForm();

    // Initialize toggle buttons for tier groups
    initTierToggles();

    // Initialize export functionality
    initExportButtons();

    // Render initial team list
    renderTeamList();
}

/**
 * Initialize project information section
 */
function initProjectInfo() {
    const nameInput = document.getElementById('project-name');
    const descInput = document.getElementById('project-description');
    const descCount = document.getElementById('desc-count');

    // Load saved values
    if (nameInput) nameInput.value = AppData.project.name;
    if (descInput) {
        descInput.value = AppData.project.description;
        if (descCount) descCount.textContent = descInput.value.length;
    }

    // Add event listeners
    if (nameInput) {
        nameInput.addEventListener('input', debounce(() => {
            AppData.project.name = nameInput.value;
            saveData();
        }, 500));
    }

    if (descInput) {
        descInput.addEventListener('input', debounce(() => {
            AppData.project.description = descInput.value;
            if (descCount) descCount.textContent = descInput.value.length;
            saveData();
        }, 500));
    }
}

/**
 * Initialize member form functionality
 */
function initMemberForm() {
    const form = document.getElementById('add-member-form');
    const roleTextarea = document.getElementById('member-role');
    const roleCount = document.getElementById('role-count');
    const cancelBtn = document.getElementById('cancel-edit-btn');

    // Character counter for role field
    if (roleTextarea && roleCount) {
        roleTextarea.addEventListener('input', () => {
            roleCount.textContent = roleTextarea.value.length;
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const memberId = form.dataset.editingId;
            if (memberId) {
                updateMember(memberId);
            } else {
                addMember();
            }
        });
    }

    // Cancel edit button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            resetMemberForm();
        });
    }
}

/**
 * Add a new member
 */
function addMember() {
    const name = document.getElementById('member-name').value.trim();
    const tier = document.getElementById('member-tier').value;
    const email = document.getElementById('member-email').value.trim();
    const payment = document.getElementById('member-payment').value.trim();
    const role = document.getElementById('member-role').value.trim();

    if (!name || !tier) {
        alert('Please fill in all required fields (Name and Tier).');
        return;
    }

    const member = {
        id: generateId(),
        name,
        tier,
        email,
        payment,
        role,
        joinDate: new Date().toISOString()
    };

    AppData.members.push(member);
    saveData();
    renderTeamList();
    resetMemberForm();

    // Show success feedback
    showToast(`${name} has been added to the team!`);
}

/**
 * Edit an existing member
 */
function editMember(memberId) {
    const member = AppData.members.find(m => m.id === memberId);
    if (!member) return;

    // Populate form
    document.getElementById('member-name').value = member.name;
    document.getElementById('member-tier').value = member.tier;
    document.getElementById('member-email').value = member.email || '';
    document.getElementById('member-payment').value = member.payment || '';
    document.getElementById('member-role').value = member.role || '';
    document.getElementById('role-count').textContent = (member.role || '').length;

    // Update form state
    const form = document.getElementById('add-member-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const cancelBtn = document.getElementById('cancel-edit-btn');

    form.dataset.editingId = memberId;
    submitBtn.textContent = 'Update Member';
    cancelBtn.style.display = 'block';

    // Scroll to form
    document.querySelector('.add-member-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Update an existing member
 */
function updateMember(memberId) {
    const member = AppData.members.find(m => m.id === memberId);
    if (!member) return;

    member.name = document.getElementById('member-name').value.trim();
    member.tier = document.getElementById('member-tier').value;
    member.email = document.getElementById('member-email').value.trim();
    member.payment = document.getElementById('member-payment').value.trim();
    member.role = document.getElementById('member-role').value.trim();

    saveData();
    renderTeamList();
    resetMemberForm();

    showToast(`${member.name}'s information has been updated!`);
}

/**
 * Delete a member
 */
function deleteMember(memberId) {
    const member = AppData.members.find(m => m.id === memberId);
    if (!member) return;

    if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
        AppData.members = AppData.members.filter(m => m.id !== memberId);
        saveData();
        renderTeamList();
        showToast(`${member.name} has been removed from the team.`);
    }
}

/**
 * Reset the member form
 */
function resetMemberForm() {
    const form = document.getElementById('add-member-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const cancelBtn = document.getElementById('cancel-edit-btn');

    form.reset();
    delete form.dataset.editingId;
    submitBtn.textContent = 'Add Member';
    cancelBtn.style.display = 'none';
    document.getElementById('role-count').textContent = '0';
}

/**
 * Render the complete team list
 */
function renderTeamList() {
    // Update stats
    updateTeamStats();

    // Render each tier
    renderTier('main');
    renderTier('assistant');
    renderTier('thanks');
    renderTier('fan');
}

/**
 * Update team statistics
 */
function updateTeamStats() {
    const stats = {
        main: AppData.members.filter(m => m.tier === 'main').length,
        assistant: AppData.members.filter(m => m.tier === 'assistant').length,
        thanks: AppData.members.filter(m => m.tier === 'thanks').length,
        fan: AppData.members.filter(m => m.tier === 'fan').length
    };

    document.getElementById('stat-main').textContent = stats.main;
    document.getElementById('stat-assistant').textContent = stats.assistant;
    document.getElementById('stat-thanks').textContent = stats.thanks;
    document.getElementById('stat-fan').textContent = stats.fan;
}

/**
 * Render a specific tier's member list
 */
function renderTier(tier) {
    const listElement = document.getElementById(`${tier}-list`);
    if (!listElement) return;

    const members = AppData.members
        .filter(m => m.tier === tier)
        .sort((a, b) => a.name.localeCompare(b.name));

    if (members.length === 0) {
        listElement.innerHTML = '';
        return;
    }

    listElement.innerHTML = members.map(member => createMemberCard(member)).join('');

    // Add event listeners to action buttons
    members.forEach(member => {
        const editBtn = listElement.querySelector(`[data-edit-id="${member.id}"]`);
        const deleteBtn = listElement.querySelector(`[data-delete-id="${member.id}"]`);

        if (editBtn) {
            editBtn.addEventListener('click', () => editMember(member.id));
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deleteMember(member.id));
        }
    });
}

/**
 * Create HTML for a member card
 */
function createMemberCard(member) {
    const tierLabels = {
        main: 'Main Tier',
        assistant: 'Assistant Tier',
        thanks: 'Special Thanks',
        fan: 'Fan Tier'
    };

    const joinDate = new Date(member.joinDate).toLocaleDateString();

    return `
        <div class="member-card" data-member-id="${member.id}">
            <div class="member-header">
                <div>
                    <div class="member-name">${escapeHtml(member.name)}</div>
                    <div class="member-tier-label">${tierLabels[member.tier]}</div>
                </div>
                <div class="member-actions">
                    <button class="action-btn" data-edit-id="${member.id}">Edit</button>
                    <button class="action-btn delete" data-delete-id="${member.id}">Remove</button>
                </div>
            </div>

            ${member.email || member.payment ? `
                <div class="member-details">
                    ${member.email ? `
                        <div class="member-detail">
                            <div class="detail-label">Email</div>
                            <div class="detail-value">${escapeHtml(member.email)}</div>
                        </div>
                    ` : ''}
                    ${member.payment ? `
                        <div class="member-detail">
                            <div class="detail-label">Payment Address</div>
                            <div class="detail-value">${escapeHtml(member.payment)}</div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            ${member.role ? `
                <div class="member-role">${escapeHtml(member.role)}</div>
            ` : ''}

            <div class="join-date">Joined: ${joinDate}</div>
        </div>
    `;
}

/**
 * Initialize tier toggle functionality
 */
function initTierToggles() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.dataset.target;
            const targetList = document.getElementById(targetId);

            if (targetList) {
                targetList.classList.toggle('collapsed');
                btn.classList.toggle('collapsed');
            }
        });
    });

    // Also make headers clickable
    const headers = document.querySelectorAll('.tier-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const toggleBtn = header.querySelector('.toggle-btn');
            if (toggleBtn) {
                toggleBtn.click();
            }
        });
    });
}

/**
 * Initialize export functionality
 */
function initExportButtons() {
    const exportBtn = document.getElementById('export-markdown-btn');
    const copyBtn = document.getElementById('copy-markdown-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', exportCreditsAsFile);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyCreditsToClipboard);
    }
}

/**
 * Generate credits markdown text
 */
function generateCreditsMarkdown() {
    let markdown = '';

    // Project header
    if (AppData.project.name) {
        markdown += `# ${AppData.project.name}\n\n`;
    }

    if (AppData.project.description) {
        markdown += `${AppData.project.description}\n\n`;
    }

    markdown += `## Credits\n\n`;

    // Generate credits by tier
    const tiers = [
        { key: 'main', label: 'Main Tier - Essential Contributors' },
        { key: 'assistant', label: 'Assistant Tier - Valuable Contributors' },
        { key: 'thanks', label: 'Special Thanks - Meaningful Contributors' },
        { key: 'fan', label: 'Fan Tier - Minor Contributors' }
    ];

    tiers.forEach(tier => {
        const members = AppData.members
            .filter(m => m.tier === tier.key)
            .sort((a, b) => a.name.localeCompare(b.name));

        if (members.length > 0) {
            markdown += `### ${tier.label}\n\n`;
            members.forEach(member => {
                markdown += `- **${member.name}**`;
                if (member.role) {
                    markdown += ` - ${member.role}`;
                }
                markdown += '\n';
            });
            markdown += '\n';
        }
    });

    return markdown;
}

/**
 * Export credits as markdown file
 */
function exportCreditsAsFile() {
    const markdown = generateCreditsMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${AppData.project.name || 'project'}_credits.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Credits exported as markdown file!');
}

/**
 * Copy credits to clipboard
 */
async function copyCreditsToClipboard() {
    const markdown = generateCreditsMarkdown();

    try {
        await navigator.clipboard.writeText(markdown);
        showToast('Credits copied to clipboard!');
    } catch (error) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = markdown;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Credits copied to clipboard!');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Generate a unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show a toast notification
 */
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// ========================================
// PAYOUT CALCULATOR TAB
// ========================================

/**
 * Initialize Payout Calculator tab functionality
 */
function initCalculatorTab() {
    const calculateBtn = document.getElementById('calculate-btn');
    const commitBtn = document.getElementById('commit-payout-btn');
    const clearBtn = document.getElementById('clear-calculation-btn');
    const notesTextarea = document.getElementById('payout-notes');
    const notesCount = document.getElementById('notes-count');

    // Set default date to today
    const dateInput = document.getElementById('payout-date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    // Character counter for notes
    if (notesTextarea && notesCount) {
        notesTextarea.addEventListener('input', () => {
            notesCount.textContent = notesTextarea.value.length;
        });
    }

    // Calculate button
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePayout);
    }

    // Commit button
    if (commitBtn) {
        commitBtn.addEventListener('click', commitPayoutToTimeline);
    }

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCalculation);
    }
}

/**
 * Calculate payout distribution
 */
function calculatePayout() {
    const revenueInput = document.getElementById('revenue-amount');
    const revenue = parseFloat(revenueInput.value);

    if (!revenue || revenue <= 0) {
        alert('Please enter a valid revenue amount.');
        return;
    }

    // Get contributing members (exclude fan tier from payouts)
    const contributingMembers = AppData.members.filter(m => m.tier !== 'fan');

    if (contributingMembers.length === 0) {
        alert('No contributing team members found. Please add members to Main, Assistant, or Special Thanks tiers first.');
        return;
    }

    // Count members by tier
    const mainCount = contributingMembers.filter(m => m.tier === 'main').length;
    const assistantCount = contributingMembers.filter(m => m.tier === 'assistant').length;
    const thanksCount = contributingMembers.filter(m => m.tier === 'thanks').length;

    // Calculate base share units
    const baseShareUnits = mainCount + (assistantCount * 0.5) + (thanksCount * 0.167);

    // Calculate base individual shares
    let mainShare = revenue / baseShareUnits;
    let assistantShare = mainShare * 0.5;
    let thanksShare = mainShare * 0.167;

    // Check if self-adjusting fairness is needed
    const assistantThankerRatio = (assistantCount + thanksCount) / (mainCount || 1);
    let adjustmentApplied = false;
    let adjustmentText = '';

    if (assistantThankerRatio > 5) {
        // Apply self-adjusting fairness algorithm
        const mainTierMinimum = 0.30; // 30% minimum for main tier
        const originalMainPercentage = (mainShare * mainCount) / revenue;

        if (originalMainPercentage < mainTierMinimum) {
            adjustmentApplied = true;

            // Adjust to ensure main tier gets at least 30%
            const mainTotalAmount = revenue * mainTierMinimum;
            mainShare = mainTotalAmount / mainCount;

            // Recalculate remaining for others
            const remainingRevenue = revenue - mainTotalAmount;
            const otherShareUnits = (assistantCount * 0.5) + (thanksCount * 0.167);
            const otherBaseShare = remainingRevenue / otherShareUnits;

            assistantShare = otherBaseShare * 0.5;
            thanksShare = otherBaseShare * 0.167;

            adjustmentText = `The assistant/thanker to main developer ratio (${assistantThankerRatio.toFixed(1)}:1) exceeded the threshold of 5:1. ` +
                `The self-adjusting fairness algorithm ensured main tier contributors receive at least ${(mainTierMinimum * 100).toFixed(0)}% of total revenue ` +
                `to maintain fair compensation for essential contributors.`;
        }
    }

    // Store calculation results
    window.currentCalculation = {
        revenue,
        mainShare,
        assistantShare,
        thanksShare,
        mainCount,
        assistantCount,
        thanksCount,
        contributingMembers,
        adjustmentApplied,
        adjustmentText,
        date: document.getElementById('payout-date').value,
        notes: document.getElementById('payout-notes').value
    };

    // Display results
    displayCalculationResults();
}

/**
 * Display calculation results
 */
function displayCalculationResults() {
    const calc = window.currentCalculation;

    // Hide empty state
    document.getElementById('calculator-empty-state').style.display = 'none';

    // Show team summary
    const teamSummary = document.getElementById('team-summary');
    teamSummary.style.display = 'block';
    document.getElementById('summary-main').textContent = calc.mainCount;
    document.getElementById('summary-assistant').textContent = calc.assistantCount;
    document.getElementById('summary-thanks').textContent = calc.thanksCount;
    document.getElementById('summary-total').textContent = calc.contributingMembers.length;

    // Show payout recommendation
    displayPayoutRecommendation(calc.revenue, calc.contributingMembers.length);

    // Show calculation results
    const resultsSection = document.getElementById('calculation-results');
    resultsSection.style.display = 'block';

    // Update summary cards
    document.getElementById('result-total').textContent = `€${calc.revenue.toFixed(2)}`;
    document.getElementById('result-per-main').textContent = `€${calc.mainShare.toFixed(2)}`;
    document.getElementById('result-per-assistant').textContent = `€${calc.assistantShare.toFixed(2)}`;
    document.getElementById('result-per-thanks').textContent = `€${calc.thanksShare.toFixed(2)}`;

    // Show/hide adjustment notice
    const adjustmentNotice = document.getElementById('adjustment-notice');
    if (calc.adjustmentApplied) {
        adjustmentNotice.style.display = 'block';
        document.getElementById('adjustment-text').textContent = calc.adjustmentText;
    } else {
        adjustmentNotice.style.display = 'none';
    }

    // Display member breakdown
    displayMemberBreakdown();

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display payout frequency recommendation
 */
function displayPayoutRecommendation(revenue, memberCount) {
    const recommendationSection = document.getElementById('payout-recommendation');
    const recommendationText = document.getElementById('recommendation-text');

    const perMemberAmount = revenue / memberCount;

    let recommendation = '';
    if (perMemberAmount >= 50) {
        recommendation = `<strong>Monthly payouts recommended.</strong> With €${perMemberAmount.toFixed(2)} per contributing member, ` +
            `you have sufficient revenue to justify monthly distributions while keeping transfer fees reasonable.`;
    } else if (perMemberAmount >= 15) {
        recommendation = `<strong>Quarterly payouts recommended.</strong> With €${perMemberAmount.toFixed(2)} per contributing member, ` +
            `it's better to wait and accumulate funds over 3 months to minimize the impact of transfer fees.`;
    } else {
        recommendation = `<strong>Hold and accumulate.</strong> With only €${perMemberAmount.toFixed(2)} per contributing member, ` +
            `the revenue is too low to justify payout at this time. Transfer fees would consume a significant portion. ` +
            `Wait until the next quarter when more revenue accumulates.`;
    }

    recommendationText.innerHTML = recommendation;
    recommendationSection.style.display = 'block';
}

/**
 * Display individual member breakdown by tier
 */
function displayMemberBreakdown() {
    const calc = window.currentCalculation;
    const container = document.getElementById('breakdown-container');

    const tiers = [
        { key: 'main', label: 'Main Tier - Essential Contributors', share: calc.mainShare },
        { key: 'assistant', label: 'Assistant Tier - Valuable Contributors', share: calc.assistantShare },
        { key: 'thanks', label: 'Special Thanks - Meaningful Contributors', share: calc.thanksShare }
    ];

    let html = '';

    tiers.forEach(tier => {
        const members = calc.contributingMembers
            .filter(m => m.tier === tier.key)
            .sort((a, b) => a.name.localeCompare(b.name));

        if (members.length > 0) {
            html += `<div class="breakdown-tier">`;
            html += `<div class="breakdown-tier-header">${tier.label}</div>`;

            members.forEach(member => {
                html += `
                    <div class="breakdown-item">
                        <div class="breakdown-name">${escapeHtml(member.name)}</div>
                        <div class="breakdown-amount">€${tier.share.toFixed(2)}</div>
                    </div>
                `;
            });

            html += `</div>`;
        }
    });

    container.innerHTML = html;
}

/**
 * Commit payout to timeline
 */
function commitPayoutToTimeline() {
    const calc = window.currentCalculation;

    if (!calc) {
        alert('No calculation to commit. Please calculate a payout first.');
        return;
    }

    // Create payout record
    const payout = {
        id: generateId(),
        date: calc.date || new Date().toISOString().split('T')[0],
        revenue: calc.revenue,
        notes: calc.notes,
        mainCount: calc.mainCount,
        assistantCount: calc.assistantCount,
        thanksCount: calc.thanksCount,
        mainShare: calc.mainShare,
        assistantShare: calc.assistantShare,
        thanksShare: calc.thanksShare,
        adjustmentApplied: calc.adjustmentApplied,
        members: calc.contributingMembers.map(m => ({
            id: m.id,
            name: m.name,
            tier: m.tier,
            amount: calc[m.tier + 'Share']
        })),
        committedAt: new Date().toISOString()
    };

    // Add to payouts array
    AppData.payouts.push(payout);
    saveData();

    // Show success message
    showToast('Payout committed to timeline successfully!');

    // Clear calculation
    clearCalculation();

    // Optionally switch to history tab
    setTimeout(() => {
        const historyBtn = document.querySelector('[data-tab="dashboard"]');
        if (historyBtn) {
            historyBtn.click();
        }
    }, 1500);
}

/**
 * Clear calculation and reset form
 */
function clearCalculation() {
    // Reset form
    document.getElementById('revenue-amount').value = '';
    document.getElementById('payout-notes').value = '';
    document.getElementById('notes-count').textContent = '0';

    // Hide results
    document.getElementById('team-summary').style.display = 'none';
    document.getElementById('payout-recommendation').style.display = 'none';
    document.getElementById('calculation-results').style.display = 'none';

    // Show empty state
    document.getElementById('calculator-empty-state').style.display = 'block';

    // Clear stored calculation
    window.currentCalculation = null;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// HISTORY TAB
// ========================================

/**
 * Initialize History tab functionality
 */
function initDashboardTab() {
    const exportReportBtn = document.getElementById('export-full-report-btn');
    const exportCSVBtn = document.getElementById('export-csv-btn');
    const refreshBtn = document.getElementById('refresh-timeline-btn');

    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', exportFullReport);
    }

    if (exportCSVBtn) {
        exportCSVBtn.addEventListener('click', exportTimelineCSV);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            renderDashboard();
            showToast('History refreshed!');
        });
    }

    // Initial render
    renderDashboard();
}

/**
 * Render the complete dashboard
 */
function renderDashboard() {
    updateOverviewStats();
    renderTimeline();
}

/**
 * Update overview statistics
 */
function updateOverviewStats() {
    const payouts = AppData.payouts || [];

    // Total revenue
    const totalRevenue = payouts.reduce((sum, p) => sum + p.revenue, 0);
    document.getElementById('total-revenue').textContent = `€${totalRevenue.toFixed(2)}`;

    // Total payouts count
    document.getElementById('total-payouts').textContent = payouts.length;

    // Last payout date
    if (payouts.length > 0) {
        const sortedPayouts = [...payouts].sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastDate = new Date(sortedPayouts[0].date).toLocaleDateString();
        document.getElementById('last-payout').textContent = lastDate;
    } else {
        document.getElementById('last-payout').textContent = 'Never';
    }

    // Average payout
    const avgPayout = payouts.length > 0 ? totalRevenue / payouts.length : 0;
    document.getElementById('avg-payout').textContent = `€${avgPayout.toFixed(2)}`;
}

/**
 * Render payout timeline
 */
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    const emptyState = document.getElementById('timeline-empty');
    const payouts = AppData.payouts || [];

    if (payouts.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Sort payouts by date (most recent first)
    const sortedPayouts = [...payouts].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedPayouts.map(payout => createTimelineItem(payout)).join('');

    // Add event listeners
    sortedPayouts.forEach(payout => {
        const toggleBtn = container.querySelector(`[data-toggle-members="${payout.id}"]`);
        const deleteBtn = container.querySelector(`[data-delete-payout="${payout.id}"]`);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => toggleMembersList(payout.id));
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deletePayout(payout.id));
        }
    });
}

/**
 * Create HTML for a timeline item
 */
function createTimelineItem(payout) {
    const date = new Date(payout.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const totalContributors = payout.mainCount + payout.assistantCount + payout.thanksCount;

    return `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${date}</div>
                <div class="timeline-amount">€${payout.revenue.toFixed(2)}</div>

                ${payout.adjustmentApplied ? `
                    <div class="timeline-adjustment-badge">⚖️ Self-Adjusting Fairness Applied</div>
                ` : ''}

                <div class="timeline-meta">
                    <div class="timeline-meta-item">
                        <div class="timeline-meta-label">Main Tier</div>
                        <div class="timeline-meta-value">${payout.mainCount} × €${payout.mainShare.toFixed(2)}</div>
                    </div>
                    <div class="timeline-meta-item">
                        <div class="timeline-meta-label">Assistant Tier</div>
                        <div class="timeline-meta-value">${payout.assistantCount} × €${payout.assistantShare.toFixed(2)}</div>
                    </div>
                    <div class="timeline-meta-item">
                        <div class="timeline-meta-label">Special Thanks</div>
                        <div class="timeline-meta-value">${payout.thanksCount} × €${payout.thanksShare.toFixed(2)}</div>
                    </div>
                    <div class="timeline-meta-item">
                        <div class="timeline-meta-label">Total Contributors</div>
                        <div class="timeline-meta-value">${totalContributors}</div>
                    </div>
                </div>

                ${payout.notes ? `
                    <div class="timeline-notes">${escapeHtml(payout.notes)}</div>
                ` : ''}

                <div class="timeline-members">
                    <button class="timeline-members-toggle" data-toggle-members="${payout.id}">
                        Show Individual Members (${payout.members.length})
                    </button>
                    <div class="timeline-members-list" id="members-${payout.id}">
                        ${payout.members.map(member => `
                            <div class="timeline-member-item">
                                <div class="timeline-member-name">${escapeHtml(member.name)}</div>
                                <div class="timeline-member-amount">€${member.amount.toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="timeline-actions">
                    <button class="timeline-action-btn delete" data-delete-payout="${payout.id}">Delete Payout</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Toggle members list visibility
 */
function toggleMembersList(payoutId) {
    const membersList = document.getElementById(`members-${payoutId}`);
    const toggleBtn = document.querySelector(`[data-toggle-members="${payoutId}"]`);

    if (membersList && toggleBtn) {
        membersList.classList.toggle('visible');
        const isVisible = membersList.classList.contains('visible');
        toggleBtn.textContent = isVisible
            ? `Hide Individual Members (${membersList.querySelectorAll('.timeline-member-item').length})`
            : `Show Individual Members (${membersList.querySelectorAll('.timeline-member-item').length})`;
    }
}

/**
 * Delete a payout from timeline
 */
function deletePayout(payoutId) {
    const payout = AppData.payouts.find(p => p.id === payoutId);
    if (!payout) return;

    const date = new Date(payout.date).toLocaleDateString();
    const amount = `€${payout.revenue.toFixed(2)}`;

    if (confirm(`Are you sure you want to delete the payout from ${date} (${amount})?\n\nThis action cannot be undone.`)) {
        AppData.payouts = AppData.payouts.filter(p => p.id !== payoutId);
        saveData();
        renderDashboard();
        showToast('Payout deleted from timeline.');
    }
}

/**
 * Export full report as markdown
 */
function exportFullReport() {
    let markdown = '';

    // Project header
    if (AppData.project.name) {
        markdown += `# ${AppData.project.name} - Revenue Share Report\n\n`;
    } else {
        markdown += `# Revenue Share Report\n\n`;
    }

    markdown += `**Generated:** ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n`;
    markdown += `---\n\n`;

    // Overview statistics
    const payouts = AppData.payouts || [];
    const totalRevenue = payouts.reduce((sum, p) => sum + p.revenue, 0);
    const avgPayout = payouts.length > 0 ? totalRevenue / payouts.length : 0;

    markdown += `## Overview\n\n`;
    markdown += `- **Total Revenue Distributed:** €${totalRevenue.toFixed(2)}\n`;
    markdown += `- **Total Payouts:** ${payouts.length}\n`;
    markdown += `- **Average Payout:** €${avgPayout.toFixed(2)}\n`;

    if (payouts.length > 0) {
        const sortedPayouts = [...payouts].sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastDate = new Date(sortedPayouts[0].date).toLocaleDateString();
        markdown += `- **Last Payout:** ${lastDate}\n`;
    }

    markdown += `\n---\n\n`;

    // Team composition
    markdown += `## Current Team Composition\n\n`;
    const mainMembers = AppData.members.filter(m => m.tier === 'main');
    const assistantMembers = AppData.members.filter(m => m.tier === 'assistant');
    const thanksMembers = AppData.members.filter(m => m.tier === 'thanks');
    const fanMembers = AppData.members.filter(m => m.tier === 'fan');

    markdown += `- **Main Tier:** ${mainMembers.length} members\n`;
    markdown += `- **Assistant Tier:** ${assistantMembers.length} members\n`;
    markdown += `- **Special Thanks Tier:** ${thanksMembers.length} members\n`;
    markdown += `- **Fan Tier:** ${fanMembers.length} members (not paid)\n`;

    markdown += `\n---\n\n`;

    // Payout timeline
    if (payouts.length > 0) {
        markdown += `## Payout Timeline\n\n`;

        const sortedPayouts = [...payouts].sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedPayouts.forEach((payout, index) => {
            const date = new Date(payout.date).toLocaleDateString();
            markdown += `### Payout #${index + 1} - ${date}\n\n`;
            markdown += `**Total Amount:** €${payout.revenue.toFixed(2)}\n\n`;

            if (payout.adjustmentApplied) {
                markdown += `⚖️ **Self-Adjusting Fairness Applied**\n\n`;
            }

            markdown += `**Distribution:**\n`;
            markdown += `- Main Tier: ${payout.mainCount} members × €${payout.mainShare.toFixed(2)} each\n`;
            markdown += `- Assistant Tier: ${payout.assistantCount} members × €${payout.assistantShare.toFixed(2)} each\n`;
            markdown += `- Special Thanks: ${payout.thanksCount} members × €${payout.thanksShare.toFixed(2)} each\n\n`;

            if (payout.notes) {
                markdown += `**Notes:** ${payout.notes}\n\n`;
            }

            markdown += `**Individual Members:**\n\n`;
            payout.members.forEach(member => {
                markdown += `- ${member.name}: €${member.amount.toFixed(2)}\n`;
            });

            markdown += `\n`;
        });
    }

    markdown += `\n---\n\n`;
    markdown += `*Report generated by Reactorcore's Revenue Share System*\n`;

    // Download the file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${AppData.project.name || 'project'}_full_report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Full report exported successfully!');
}

/**
 * Export timeline as CSV
 */
function exportTimelineCSV() {
    const payouts = AppData.payouts || [];

    if (payouts.length === 0) {
        alert('No payouts to export. Add some payouts first.');
        return;
    }

    // CSV header
    let csv = 'Date,Total Revenue,Main Count,Main Share,Assistant Count,Assistant Share,Thanks Count,Thanks Share,Total Contributors,Adjustment Applied,Notes\n';

    // Sort by date
    const sortedPayouts = [...payouts].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Add rows
    sortedPayouts.forEach(payout => {
        const totalContributors = payout.mainCount + payout.assistantCount + payout.thanksCount;
        const notes = payout.notes ? `"${payout.notes.replace(/"/g, '""')}"` : '';

        csv += `${payout.date},`;
        csv += `${payout.revenue.toFixed(2)},`;
        csv += `${payout.mainCount},`;
        csv += `${payout.mainShare.toFixed(2)},`;
        csv += `${payout.assistantCount},`;
        csv += `${payout.assistantShare.toFixed(2)},`;
        csv += `${payout.thanksCount},`;
        csv += `${payout.thanksShare.toFixed(2)},`;
        csv += `${totalContributors},`;
        csv += `${payout.adjustmentApplied ? 'Yes' : 'No'},`;
        csv += `${notes}\n`;
    });

    // Download the file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${AppData.project.name || 'project'}_timeline.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Timeline exported as CSV!');
}

// ========================================
// FILE MANAGEMENT SYSTEM
// ========================================

/**
 * Track unsaved changes
 */
let hasUnsavedChanges = false;
let currentFileName = null;

/**
 * Mark data as having unsaved changes
 */
function markUnsaved() {
    hasUnsavedChanges = true;
    updateFileStatus();
}

/**
 * Mark data as saved
 */
function markSaved() {
    hasUnsavedChanges = false;
    updateFileStatus();
}

/**
 * Update the file status indicator
 */
function updateFileStatus() {
    const statusEl = document.getElementById('file-status');
    const statusName = document.getElementById('file-status-name');
    const statusState = document.getElementById('file-status-state');
    const statusIcon = document.getElementById('file-status-icon');

    if (!statusEl || !statusName || !statusState || !statusIcon) return;

    // Update warning visibility
    updateNoFileWarnings();

    if (currentFileName) {
        // File is loaded
        statusName.textContent = currentFileName;
        statusEl.classList.add('loaded');

        if (hasUnsavedChanges) {
            statusState.textContent = 'Status: Unsaved changes';
            statusEl.classList.add('unsaved');
            statusIcon.textContent = '●'; // Orange dot for unsaved
        } else {
            statusState.textContent = 'Status: Saved';
            statusEl.classList.remove('unsaved');
            statusIcon.textContent = '✓'; // Green checkmark for saved
        }
    } else {
        // No file loaded
        statusName.textContent = 'None - Please drag & drop existing file anywhere or save new data';
        statusState.textContent = 'Status: Not loaded';
        statusEl.classList.remove('unsaved');
        statusEl.classList.remove('loaded');
        statusIcon.textContent = '⚠'; // Warning for no file
    }
}

/**
 * Update no-file warning visibility across tabs
 */
function updateNoFileWarnings() {
    const teamWarning = document.getElementById('team-no-file-warning');
    const calculatorWarning = document.getElementById('calculator-no-file-warning');
    const historyWarning = document.getElementById('history-no-file-warning');

    const shouldShow = !currentFileName;

    if (teamWarning) teamWarning.style.display = shouldShow ? 'block' : 'none';
    if (calculatorWarning) calculatorWarning.style.display = shouldShow ? 'block' : 'none';
    if (historyWarning) historyWarning.style.display = shouldShow ? 'block' : 'none';
}

/**
 * Initialize file management system
 */
function initFileManagement() {
    const loadBtn = document.getElementById('load-data-btn');
    const saveBtn = document.getElementById('save-data-btn');
    const fileInput = document.getElementById('file-input');
    const dropOverlay = document.getElementById('drop-overlay');

    // Load button click
    if (loadBtn && fileInput) {
        loadBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // File input change
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                loadProjectFile(file);
            }
            // Reset input so same file can be loaded again
            fileInput.value = '';
        });
    }

    // Save button click
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveProjectFile();
        });
    }

    // Drag and drop functionality
    initDragAndDrop(dropOverlay);

    // Warn before leaving with unsaved changes
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });

    // Override the existing saveData function to mark as unsaved
    const originalSaveData = saveData;
    window.saveData = function() {
        originalSaveData();
        markUnsaved();
    };

    // Initial status
    updateFileStatus();
}

/**
 * Save project data to a downloadable JSON file
 */
function saveProjectFile() {
    try {
        // Generate timestamp for filename
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const projectName = AppData.project.name || 'project';
        const filename = `${projectName.replace(/[^a-z0-9]/gi, '_')}_${timestamp}.json`;

        // Create JSON content
        const dataStr = JSON.stringify(AppData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        // Create download link
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Update status
        currentFileName = filename;
        markSaved();
        showToast(`Project saved as ${filename}`);

    } catch (error) {
        console.error('Error saving file:', error);
        showToast('Error saving file. Please try again.', 'error');
    }
}

/**
 * Load project data from a JSON file
 * @param {File} file - The file to load
 */
function loadProjectFile(file) {
    if (!file.name.endsWith('.json')) {
        showToast('Please select a valid JSON file', 'error');
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // Validate data structure
            if (!data.project || !data.members || !data.payouts) {
                throw new Error('Invalid project file format');
            }

            // Load data into AppData
            AppData.project = data.project || { name: '', description: '' };
            AppData.members = data.members || [];
            AppData.payouts = data.payouts || [];

            // Save to localStorage
            saveData();

            // Update UI
            refreshAllTabs();

            // Update status
            currentFileName = file.name;
            markSaved();
            showToast(`Project loaded: ${file.name}`);

        } catch (error) {
            console.error('Error loading file:', error);
            showToast('Error loading file. Please check the file format.', 'error');
        }
    };

    reader.onerror = () => {
        showToast('Error reading file', 'error');
    };

    reader.readAsText(file);
}

/**
 * Initialize drag and drop functionality
 * @param {HTMLElement} overlay - The drop overlay element
 */
function initDragAndDrop(overlay) {
    let dragCounter = 0;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Show overlay when dragging file over window
    document.body.addEventListener('dragenter', (e) => {
        dragCounter++;
        if (dragCounter === 1 && overlay) {
            overlay.classList.add('active');
        }
    });

    document.body.addEventListener('dragleave', (e) => {
        dragCounter--;
        if (dragCounter === 0 && overlay) {
            overlay.classList.remove('active');
        }
    });

    // Handle drop
    document.body.addEventListener('drop', (e) => {
        dragCounter = 0;
        if (overlay) {
            overlay.classList.remove('active');
        }

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            loadProjectFile(files[0]);
        }
    });
}

/**
 * Refresh all tabs with current data
 */
function refreshAllTabs() {
    // Refresh project info
    const nameInput = document.getElementById('project-name');
    const descInput = document.getElementById('project-description');
    const descCount = document.getElementById('desc-count');

    if (nameInput) nameInput.value = AppData.project.name || '';
    if (descInput) {
        descInput.value = AppData.project.description || '';
        if (descCount) descCount.textContent = descInput.value.length;
    }

    // Refresh team list
    renderTeamList();

    // Refresh dashboard
    renderDashboard();

    // Clear calculator if it was showing results
    const calcResults = document.getElementById('calculation-results');
    if (calcResults) calcResults.style.display = 'none';

    showToast('All data refreshed');
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    if (type === 'error') {
        toast.style.background = '#ff4444';
    }

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ========================================
// EXPORT FUNCTIONS FOR FUTURE USE
// ========================================

// Make key functions available globally for future feature additions
window.RevShareSystem = {
    switchTab: switchTab,
    debounce: debounce,
    AppData: AppData,
    saveData: saveData,
    loadData: loadData,
    calculatePayout: calculatePayout,
    renderDashboard: renderDashboard,
    saveProjectFile: saveProjectFile,
    loadProjectFile: loadProjectFile,
    markUnsaved: markUnsaved,
    markSaved: markSaved
};
