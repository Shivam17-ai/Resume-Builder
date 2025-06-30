document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    const resumePreview = document.getElementById('resumePreview');

    // Personal Info
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const linkedinInput = document.getElementById('linkedin');
    const githubInput = document.getElementById('github');
    const leetcodeInput = document.getElementById('leetcode');
    const websiteInput = document.getElementById('website'); // New website input

    const previewName = document.getElementById('previewName');
    const previewContact = document.getElementById('previewContact'); // Parent for contact info

    // Education
    const addEducationBtn = document.getElementById('addEducationBtn');
    const educationInputsDiv = document.getElementById('educationInputs');
    const educationSection = document.getElementById('educationSection');
    const educationTableBody = document.getElementById('educationTableBody');

    // Internships
    const addInternshipBtn = document.getElementById('addInternshipBtn');
    const internshipInputsDiv = document.getElementById('internshipInputs');
    const internshipSection = document.getElementById('internshipSection');
    const internshipList = document.getElementById('internshipList');

    // Projects
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectInputsDiv = document.getElementById('projectInputs');
    const projectSection = document.getElementById('projectSection');
    const projectList = document.getElementById('projectList'); // Corrected reference

    // Responsibilities
    const addResponsibilityBtn = document.getElementById('addResponsibilityBtn');
    const responsibilityInputsDiv = document.getElementById('responsibilityInputs');
    const responsibilitySection = document.getElementById('responsibilitySection');
    const responsibilityList = document.getElementById('responsibilityList');

    // Technical Skills - MODIFIED REFERENCES
    const addSkillBtn = document.getElementById('addSkillBtn');
    const skillInputsDiv = document.getElementById('skillInputs');
    const technicalSkillsSection = document.getElementById('technicalSkillsSection');
    const skillList = document.getElementById('skillList');


    // --- Data Storage (simulated state) ---
    let personalInfo = {
        name: '',
        phone: '',
        email: '',
        linkedin: '',
        github: '',
        leetcode: '',
        website: '', // New website field
    };
    let education = [];
    let internships = [];
    let projects = [];
    let responsibilities = [];
    let skills = []; // MODIFIED: Array to store skill categories and details


    // --- Utility Functions ---

    // Function to auto-resize text areas
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    // --- Render Functions for Dynamic Sections ---

    function renderEducation() {
        educationTableBody.innerHTML = ''; // Clear existing
        if (education.length === 0) {
            educationSection.classList.add('hidden');
            return;
        }
        educationSection.classList.remove('hidden');

        education.forEach((edu, index) => {
            const row = document.createElement('tr');
            row.classList.add(index % 2 === 0 ? 'bg-white' : 'bg-gray-50');
            row.innerHTML = `
                <td class="p-2">${edu.course}</td>
                <td class="p-2">${edu.college}</td>
                <td class="p-2">${edu.year}</td>
                <td class="p-2">${edu.grade}</td>
            `;
            educationTableBody.appendChild(row);
        });
    }

    function renderInternships() {
        internshipList.innerHTML = ''; // Clear existing
        if (internships.length === 0) {
            internshipSection.classList.add('hidden');
            return;
        }
        internshipSection.classList.remove('hidden');

        internships.forEach((intern) => {
            const div = document.createElement('div');
            div.classList.add('mb-4');
            let descriptionHtml = '';
            if (intern.description) {
                const bulletPoints = intern.description.split('\n').filter(line => line.trim() !== '');
                if (bulletPoints.length > 0) {
                    descriptionHtml = `<ul class="list-disc pl-5 text-gray-700 mt-1">`;
                    bulletPoints.forEach(line => {
                        descriptionHtml += `<li>${line.trim()}</li>`;
                    });
                    descriptionHtml += `</ul>`;
                }
            }
            // Ensure link is always clickable if present
            const linkHtml = intern.link ? `<p class="text-sm mt-1">Project Link: <a href="${intern.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${intern.link}</a></p>` : '';

            div.innerHTML = `
                <h3 class="font-semibold text-gray-800" style="font-size: 1.125rem;">${intern.title} - ${intern.organization} <span class="text-gray-500" style="font-size: 0.875rem;">(${intern.duration})</span></h3>
                ${descriptionHtml}
                ${linkHtml}
            `;
            internshipList.appendChild(div);
        });
    }

    function renderProjects() {
        projectList.innerHTML = ''; // Clear existing
        if (projects.length === 0) {
            projectSection.classList.add('hidden');
            return;
        }
        projectSection.classList.remove('hidden');

        projects.forEach((proj) => {
            const div = document.createElement('div');
            div.classList.add('mb-4');
            let descriptionHtml = '';
            if (proj.description) {
                const bulletPoints = proj.description.split('\n').filter(line => line.trim() !== '');
                if (bulletPoints.length > 0) {
                    descriptionHtml = `<ul class="list-disc pl-5 text-gray-700 mt-1">`;
                    bulletPoints.forEach(line => {
                        descriptionHtml += `<li>${line.trim()}</li>`;
                    });
                    descriptionHtml += `</ul>`;
                }
            }
            // Ensure link is always clickable if present
            const linkHtml = proj.link ? `<p class="text-sm mt-1">Project Link: <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${proj.link}</a></p>` : '';

            div.innerHTML = `
                <h3 class="font-semibold text-gray-800" style="font-size: 1.125rem;">${proj.title}</h3>
                ${descriptionHtml}
                ${linkHtml}
            `;
            projectList.appendChild(div);
        });
    }

    function renderResponsibilities() {
        responsibilityList.innerHTML = ''; // Clear existing
        if (responsibilities.length === 0) {
            responsibilitySection.classList.add('hidden');
            return;
        }
        responsibilitySection.classList.remove('hidden');

        responsibilities.forEach((res) => {
            const div = document.createElement('div');
            div.classList.add('mb-4');
            let descriptionHtml = '';
            if (res.description) {
                const bulletPoints = res.description.split('\n').filter(line => line.trim() !== '');
                if (bulletPoints.length > 0) {
                    descriptionHtml = `<ul class="list-disc pl-5 text-gray-700 mt-1">`;
                    bulletPoints.forEach(line => {
                        descriptionHtml += `<li>${line.trim()}</li>`;
                    });
                    descriptionHtml += `</ul>`;
                }
            }
            const linkHtml = res.link ? `<p class="text-sm mt-1">Project Link: <a href="${res.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${res.link}</a></p>` : '';

            div.innerHTML = `
                <h3 class="font-semibold text-gray-800" style="font-size: 1.125rem;">${res.title}</h3>
                ${descriptionHtml}
                ${linkHtml}
            `;
            responsibilityList.appendChild(div);
        });
    }

    function renderTechnicalSkills() {
        skillList.innerHTML = ''; // Clear existing
        if (skills.length === 0) {
            technicalSkillsSection.classList.add('hidden');
            return;
        }
        technicalSkillsSection.classList.remove('hidden');

        skills.forEach(skill => {
            const p = document.createElement('p');
            p.classList.add('mb-1');
            p.innerHTML = `<span class="font-semibold text-gray-800">${skill.category}:</span> ${skill.details}`;
            skillList.appendChild(p);
        });
    }

    // --- Update Preview Function ---
    function updateResumePreview() {
        // Personal Info
        previewName.textContent = personalInfo.name || 'Your Name';
        
        // Clear existing content in previewContact to rebuild it
        previewContact.innerHTML = ''; 

        const contactItems = [];
        if (personalInfo.phone) {
            contactItems.push(personalInfo.phone);
        }
        if (personalInfo.email) {
            contactItems.push(personalInfo.email);
        }
        if (personalInfo.linkedin) {
            contactItems.push(`<a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">LinkedIn</a>`);
        }
        if (personalInfo.github) {
            contactItems.push(`<a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">GitHub</a>`);
        }
        if (personalInfo.leetcode) {
            contactItems.push(`<a href="${personalInfo.leetcode}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">LeetCode</a>`);
        }
        if (personalInfo.website) { // Added website link
            contactItems.push(`<a href="${personalInfo.website}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Website</a>`);
        }

        previewContact.innerHTML = contactItems.join(' | ');


        renderEducation();
        renderInternships();
        renderProjects();
        renderResponsibilities();
        renderTechnicalSkills();
    }

    // --- Event Listeners for Input Changes ---

    // Personal Info
    nameInput.addEventListener('input', (e) => { personalInfo.name = e.target.value; updateResumePreview(); });
    phoneInput.addEventListener('input', (e) => { personalInfo.phone = e.target.value; updateResumePreview(); });
    emailInput.addEventListener('input', (e) => { personalInfo.email = e.target.value; updateResumePreview(); });
    linkedinInput.addEventListener('input', (e) => { personalInfo.linkedin = e.target.value; updateResumePreview(); });
    githubInput.addEventListener('input', (e) => { personalInfo.github = e.target.value; updateResumePreview(); });
    leetcodeInput.addEventListener('input', (e) => { personalInfo.leetcode = e.target.value; updateResumePreview(); });
    websiteInput.addEventListener('input', (e) => { personalInfo.website = e.target.value; updateResumePreview(); }); // New website input listener
    
    // --- Dynamic Section Handlers ---

    function createEducationInputRow(edu, index) {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-4', 'border', 'rounded-lg', 'bg-gray-50', 'flex', 'flex-col', 'gap-2', 'relative');
        div.innerHTML = `
            <button class="remove-item-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg" data-index="${index}" data-type="education">&times;</button>
            <label for="eduCourse${index}" class="block text-sm font-medium text-gray-700">Course</label>
            <input type="text" id="eduCourse${index}" name="course" value="${edu.course}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Course">
            <label for="eduCollege${index}" class="block text-sm font-medium text-gray-700">College/University</label>
            <input type="text" id="eduCollege${index}" name="college" value="${edu.college}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter College/University">
            <label for="eduYear${index}" class="block text-sm font-medium text-gray-700">Year</label>
            <input type="text" id="eduYear${index}" name="year" value="${edu.year}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Year">
            <label for="eduGrade${index}" class="block text-sm font-medium text-gray-700">Grade</label>
            <input type="text" id="eduGrade${index}" name="grade" value="${edu.grade}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Grade">
        `;
        return div;
    }

    function addEducation() {
        const newEdu = { course: '', college: '', year: '', grade: '' };
        education.push(newEdu);
        const newIndex = education.length - 1;
        const newRow = createEducationInputRow(newEdu, newIndex);
        educationInputsDiv.appendChild(newRow);

        // Add event listeners to new inputs
        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', (e) => {
                education[newIndex][e.target.name] = e.target.value;
                updateResumePreview();
            });
        });
        updateResumePreview();
    }

    educationInputsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') && e.target.dataset.type === 'education') {
            const indexToRemove = parseInt(e.target.dataset.index);
            education.splice(indexToRemove, 1);
            educationInputsDiv.innerHTML = ''; // Clear and re-render all to fix indices
            education.forEach((edu, idx) => {
                educationInputsDiv.appendChild(createEducationInputRow(edu, idx));
            });
            updateResumePreview();
        }
    });

    addEducationBtn.addEventListener('click', addEducation);

    // --- Internship Handlers ---
    function createInternshipInputRow(intern, index) {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-4', 'border', 'rounded-lg', 'bg-gray-50', 'flex', 'flex-col', 'gap-2', 'relative');
        div.innerHTML = `
            <button class="remove-item-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg" data-index="${index}" data-type="internship">&times;</button>
            <label for="internTitle${index}" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="internTitle${index}" name="title" value="${intern.title}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Title">
            <label for="internOrg${index}" class="block text-sm font-medium text-gray-700">Organization</label>
            <input type="text" id="internOrg${index}" name="organization" value="${intern.organization}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Organization">
            <label for="internDuration${index}" class="block text-sm font-medium text-gray-700">Duration</label>
            <input type="text" id="internDuration${index}" name="duration" value="${intern.duration}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Duration">
            <label for="internDesc${index}" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="internDesc${index}" name="description" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y overflow-hidden editable-input" placeholder="Enter Description (use new lines for bullet points)">${intern.description}</textarea>
            <label for="internLink${index}" class="block text-sm font-medium text-gray-700">Project Link</label>
            <input type="url" id="internLink${index}" name="link" value="${intern.link}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Project Link">
        `;
        return div;
    }

    function addInternship() {
        const newIntern = { title: '', organization: '', duration: '', description: '', link: '' };
        internships.push(newIntern);
        const newIndex = internships.length - 1;
        const newRow = createInternshipInputRow(newIntern, newIndex);
        internshipInputsDiv.appendChild(newRow);

        // Add event listeners to new inputs
        newRow.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                internships[newIndex][e.target.name] = e.target.value;
                if (e.target.tagName === 'TEXTAREA') autoResizeTextarea(e.target);
                updateResumePreview();
            });
        });
        updateResumePreview();
    }

    internshipInputsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') && e.target.dataset.type === 'internship') {
            const indexToRemove = parseInt(e.target.dataset.index);
            internships.splice(indexToRemove, 1);
            internshipInputsDiv.innerHTML = ''; // Clear and re-render all to fix indices
            internships.forEach((intern, idx) => {
                internshipInputsDiv.appendChild(createInternshipInputRow(intern, idx));
            });
            updateResumePreview();
        }
    });

    addInternshipBtn.addEventListener('click', addInternship);

    // --- Project Handlers ---
    function createProjectInputRow(proj, index) {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-4', 'border', 'rounded-lg', 'bg-gray-50', 'flex', 'flex-col', 'gap-2', 'relative');
        div.innerHTML = `
            <button class="remove-item-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg" data-index="${index}" data-type="project">&times;</button>
            <label for="projTitle${index}" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="projTitle${index}" name="title" value="${proj.title}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Title">
            <label for="projDesc${index}" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="projDesc${index}" name="description" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y overflow-hidden editable-input" placeholder="Enter Description (use new lines for bullet points)">${proj.description}</textarea>
            <label for="projLink${index}" class="block text-sm font-medium text-gray-700">Project Link</label>
            <input type="url" id="projLink${index}" name="link" value="${proj.link}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Project Link">
        `;
        return div;
    }

    function addProject() {
        const newProj = { title: '', description: '', link: '' };
        projects.push(newProj);
        const newIndex = projects.length - 1;
        const newRow = createProjectInputRow(newProj, newIndex);
        projectInputsDiv.appendChild(newRow);

        // Add event listeners to new inputs
        newRow.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                projects[newIndex][e.target.name] = e.target.value;
                if (e.target.tagName === 'TEXTAREA') autoResizeTextarea(e.target);
                updateResumePreview();
            });
        });
        updateResumePreview();
    }

    projectInputsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') && e.target.dataset.type === 'project') {
            const indexToRemove = parseInt(e.target.dataset.index);
            projects.splice(indexToRemove, 1);
            projectInputsDiv.innerHTML = ''; // Clear and re-render all to fix indices
            projects.forEach((proj, idx) => {
                projectInputsDiv.appendChild(createProjectInputRow(proj, idx));
            });
            updateResumePreview();
        }
    });

    addProjectBtn.addEventListener('click', addProject);

    // --- Responsibility Handlers ---
    function createResponsibilityInputRow(res, index) {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-4', 'border', 'rounded-lg', 'bg-gray-50', 'flex', 'flex-col', 'gap-2', 'relative');
        div.innerHTML = `
            <button class="remove-item-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg" data-index="${index}" data-type="responsibility">&times;</button>
            <label for="resTitle${index}" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="resTitle${index}" name="title" value="${res.title}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Title">
            <label for="resDesc${index}" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="resDesc${index}" name="description" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y overflow-hidden editable-input" placeholder="Enter Description (use new lines for bullet points)">${res.description}</textarea>
            <label for="resLink${index}" class="block text-sm font-medium text-gray-700">Project Link</label>
            <input type="url" id="resLink${index}" name="link" value="${res.link}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Project Link">
        `;
        return div;
    }

    function addResponsibility() {
        const newRes = { title: '', description: '', link: '' };
        responsibilities.push(newRes);
        const newIndex = responsibilities.length - 1;
        const newRow = createResponsibilityInputRow(newRes, newIndex);
        responsibilityInputsDiv.appendChild(newRow);

        // Add event listeners to new inputs
        newRow.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                responsibilities[newIndex][e.target.name] = e.target.value;
                if (e.target.tagName === 'TEXTAREA') autoResizeTextarea(e.target);
                updateResumePreview();
            });
        });
        updateResumePreview();
    }

    responsibilityInputsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') && e.target.dataset.type === 'responsibility') {
            const indexToRemove = parseInt(e.target.dataset.index);
            responsibilities.splice(indexToRemove, 1);
            responsibilityInputsDiv.innerHTML = ''; // Clear and re-render all to fix indices
            responsibilities.forEach((res, idx) => {
                responsibilityInputsDiv.appendChild(createResponsibilityInputRow(res, idx));
            });
            updateResumePreview();
        }
    });

    addResponsibilityBtn.addEventListener('click', addResponsibility);

    // --- Dynamic Technical Skills Handlers ---
    function createSkillInputRow(skill, index) {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-4', 'border', 'rounded-lg', 'bg-gray-50', 'flex', 'flex-col', 'gap-2', 'relative');
        div.innerHTML = `
            <button class="remove-item-btn absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg" data-index="${index}" data-type="skill">&times;</button>
            <label for="skillCategory${index}" class="block text-sm font-medium text-gray-700">Skill Category (e.g., Languages, Frameworks)</label>
            <input type="text" id="skillCategory${index}" name="category" value="${skill.category}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 editable-input" placeholder="Enter Skill Category">
            <label for="skillDetails${index}" class="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
            <textarea id="skillDetails${index}" name="details" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y overflow-hidden editable-input" placeholder="e.g., C++, Python, Java, JavaScript">${skill.details}</textarea>
        `;
        return div;
    }

    function addSkill() {
        const newSkill = { category: '', details: '' };
        skills.push(newSkill);
        const newIndex = skills.length - 1;
        const newRow = createSkillInputRow(newSkill, newIndex);
        skillInputsDiv.appendChild(newRow);

        // Add event listeners to new inputs
        newRow.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                skills[newIndex][e.target.name] = e.target.value;
                if (e.target.tagName === 'TEXTAREA') autoResizeTextarea(e.target);
                updateResumePreview();
            });
        });
        updateResumePreview();
    }

    skillInputsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') && e.target.dataset.type === 'skill') {
            const indexToRemove = parseInt(e.target.dataset.index);
            skills.splice(indexToRemove, 1);
            skillInputsDiv.innerHTML = ''; // Clear and re-render all to fix indices
            skills.forEach((skill, idx) => {
                skillInputsDiv.appendChild(createSkillInputRow(skill, idx));
            });
            updateResumePreview();
        }
    });

    addSkillBtn.addEventListener('click', addSkill);


    // --- Download Resume Function ---
    downloadResumeBtn.addEventListener('click', () => {
        const element = resumePreview;
        const opt = {
            margin: 0.5,
            filename: `${personalInfo.name || 'Resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            // Increased scale for better resolution, might help fitting
            html2canvas: { scale: 3, useCORS: true }, 
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Add a temporary class to hide input fields before generating PDF
        const inputs = document.querySelectorAll('.editable-input');
        inputs.forEach(input => input.classList.add('hide-for-pdf'));

        // This checks if html2pdf is available on the window object
        // It should be available as it's loaded via CDN script tag
        if (window.html2pdf) {
            window.html2pdf().set(opt).from(element).save().then(() => {
                // Remove the temporary class after PDF generation
                inputs.forEach(input => input.classList.remove('hide-for-pdf'));
            });
        } else {
            console.error("html2pdf library not loaded. Please check the CDN link.");
            // You can display a message to the user here instead of alert()
        }
    });

    // Initial render
    updateResumePreview();
});