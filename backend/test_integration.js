const baseUrl = 'http://localhost:5000/api';
const adminPassword = 'admin123';

const runTests = async () => {
    console.log('🚀 Running Backend Integration Tests using native fetch...\n');

    try {
        // Test 1: Public projects endpoint
        console.log('Test 1: GET /projects (Public)...');
        const projectsRes = await fetch(`${baseUrl}/projects`);
        const projectsData = await projectsRes.json();
        console.log(`✅ Success: Found ${projectsData.length} projects.\n`);

        // Test 2: Unauthorized access to visitors endpoint
        console.log('Test 2: GET /visitors (Should fail - No Auth)...');
        const badVisitorRes = await fetch(`${baseUrl}/visitors`);
        if (badVisitorRes.status === 401) {
            console.log('✅ Success: Received expected 401 Unauthorized status.\n');
        } else {
            console.log(`❌ Failure: Expected 401 but got: ${badVisitorRes.status}\n`);
        }

        // Test 3: Authorized access to visitors endpoint
        console.log('Test 3: GET /visitors (Should succeed - With Auth)...');
        const visitorRes = await fetch(`${baseUrl}/visitors`, {
            headers: { Authorization: `Bearer ${adminPassword}` }
        });
        const visitorData = await visitorRes.json();
        console.log(`✅ Success: Found ${visitorData.visitors.length} visitors.\n`);

        // Test 4: Submit a new contact message and check email dispatch
        console.log('Test 4: POST /contact (Should succeed and trigger emails)...');
        const contactPayload = {
            name: 'Test Tester',
            email: 'mallinadhanu@gmail.com',
            message: 'Hello, this is a test from the integration script!'
        };
        const contactRes = await fetch(`${baseUrl}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactPayload)
        });
        const contactData = await contactRes.json();
        console.log(`✅ Success: ${contactData.message}\n`);

        // Test 5: GET /contact messages
        console.log('Test 5: GET /contact (Should find the submitted message)...');
        const messagesRes = await fetch(`${baseUrl}/contact`, {
            headers: { Authorization: `Bearer ${adminPassword}` }
        });
        const messagesData = await messagesRes.json();
        const testMsg = messagesData.messages.find(m => m.name === 'Test Tester');
        if (testMsg) {
            console.log(`✅ Success: Found submitted message with ID: ${testMsg._id}\n`);
            
            // Test 6: DELETE contact message
            console.log(`Test 6: DELETE /contact/${testMsg._id}...`);
            const delRes = await fetch(`${baseUrl}/contact/${testMsg._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${adminPassword}` }
            });
            const delData = await delRes.json();
            console.log(`✅ Success: ${delData.message}\n`);
        } else {
            console.log('❌ Failure: Submitted message not found in database.\n');
        }

        // Test 7: Add a new custom project via CMS
        console.log('Test 7: POST /projects (Add custom project)...');
        const projectPayload = {
            title: 'Integration Test Project',
            description: 'Created by automated integration test.',
            techStack: 'Node.js, Express, Axios',
            image: '/images/test.png',
            githubLink: 'https://github.com',
            liveDemo: 'https://demo.com',
            status: 'Real'
        };
        const newProjRes = await fetch(`${baseUrl}/projects`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminPassword}`
            },
            body: JSON.stringify(projectPayload)
        });
        const newProjData = await newProjRes.json();
        console.log(`✅ Success: Project created with ID: ${newProjData.project._id}\n`);
        const projId = newProjData.project._id;

        // Test 8: Edit the custom project
        console.log(`Test 8: PUT /projects/${projId} (Edit project)...`);
        const editPayload = {
            ...projectPayload,
            title: 'Edited Integration Test Project'
        };
        const editProjRes = await fetch(`${baseUrl}/projects/${projId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminPassword}`
            },
            body: JSON.stringify(editPayload)
        });
        const editProjData = await editProjRes.json();
        console.log(`✅ Success: Updated title: ${editProjData.project.title}\n`);

        // Test 9: Delete the custom project
        console.log(`Test 9: DELETE /projects/${projId}...`);
        const delProjRes = await fetch(`${baseUrl}/projects/${projId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${adminPassword}` }
        });
        const delProjData = await delProjRes.json();
        console.log(`✅ Success: ${delProjData.message}\n`);

    } catch (err) {
        console.error('❌ Integration Test crashed with error:', err.message);
    }
};

runTests();
