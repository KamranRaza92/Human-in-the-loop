 async function sendToN8N() {
            const topicField = document.getElementById('topic');
            const nameField = document.getElementById('recipient_name');
            const btn = document.getElementById('btnText');
            const success = document.getElementById('success');

            const topic = topicField.value;
            const recipientName = nameField.value;

            if (!topic || !recipientName) {
                alert("Please fill in both fields!");
                return;
            }

            btn.innerText = "Sending...";
            btn.disabled = true;

            try {
                const webhookUrl = 'http://localhost:5678/webhook-test/2f3e2ea8-5844-4c69-a15d-5eb97c088de4';
                
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        topic: topic, 
                        recipient_name: recipientName,
                        requester: "Farzeen Ali" 
                    })
                });

                if (response.ok) {
                    success.classList.remove('hidden');
                    topicField.value = '';
                    nameField.value = '';
                    btn.innerText = "Done!";
                    
                    setTimeout(() => {
                        btn.innerText = "Generate Draft";
                        btn.disabled = false;
                        success.classList.add('hidden');
                    }, 3000);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Connection failed. Check n8n webhook.");
                btn.innerText = "Generate Draft";
                btn.disabled = false;
            }
        }