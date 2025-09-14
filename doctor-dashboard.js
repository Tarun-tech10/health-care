// Video Call Variables
let localStream;
let remoteStream;
let isMuted = false;
let isVideoOff = false;
let isScreenSharing = false;
let screenStream;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'doctor') {
        window.location.href = 'index.html';
        return;
    }

    loadDoctorData();
    loadTodayAppointments();
    loadRecentPatients();
});

// Video Call Functions
async function startVideoConsultation(patientId = null) {
    try {
        const modal = document.getElementById('videoCallModal');
        modal.style.display = 'block';
        
        // Get user media
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = localStream;
        
        // Here you would typically connect to a signaling server
        // and establish a peer connection with the patient
        // For demo purposes, we'll just show the local video
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera and microphone. Please check your permissions.');
    }
}

async function toggleScreenShare() {
    try {
        if (!isScreenSharing) {
            screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
            const localVideo = document.getElementById('localVideo');
            localVideo.srcObject = screenStream;
            isScreenSharing = true;
        } else {
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
            const localVideo = document.getElementById('localVideo');
            localVideo.srcObject = localStream;
            isScreenSharing = false;
        }
    } catch (error) {
        console.error('Error sharing screen:', error);
    }
}

function closeVideoCall() {
    const modal = document.getElementById('videoCallModal');
    modal.style.display = 'none';
    
    // Stop all tracks
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
    }
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
    }
}

// Dashboard Functions
function loadDoctorData() {
    // Get doctor data from localStorage
    const doctorName = localStorage.getItem('userName') || 'Dr. Sarah Johnson';
    document.querySelector('.user-name').textContent = doctorName;
}

function loadTodayAppointments() {
    // Here you would typically fetch appointments from an API
    // For demo purposes, we're using static data
}

function loadRecentPatients() {
    // Here you would typically fetch recent patients from an API
    // For demo purposes, we're using static data
}

function viewPatientList() {
    // Redirect to patient list page
    window.location.href = 'patient-list.html';
}

function viewAppointments() {
    // Redirect to appointments page
    window.location.href = 'appointments.html';
}

function writePrescription() {
    // Open prescription form
    window.location.href = 'prescription-form.html';
}

function viewPatientHistory(patientId) {
    const modal = document.getElementById('patientHistoryModal');
    const historyContent = document.querySelector('.history-content');
    
    // Here you would typically fetch patient history from an API
    // For demo purposes, we're using static data
    historyContent.innerHTML = `
        <div class="history-item">
            <h3>Medical History</h3>
            <ul>
                <li>Hypertension - Diagnosed 2 years ago</li>
                <li>Regular medication: Amlodipine 5mg</li>
                <li>Last blood pressure reading: 130/85</li>
            </ul>
        </div>
        <div class="history-item">
            <h3>Recent Visits</h3>
            <ul>
                <li>2023-03-15: Regular checkup</li>
                <li>2023-02-10: Blood pressure follow-up</li>
                <li>2023-01-05: Initial consultation</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closePatientHistory() {
    const modal = document.getElementById('patientHistoryModal');
    modal.style.display = 'none';
}

function viewPatientDetails(patientId) {
    // Redirect to patient details page
    window.location.href = `patient-details.html?id=${patientId}`;
}

function logout() {
    // Clear doctor session and redirect to login
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const videoModal = document.getElementById('videoCallModal');
    const historyModal = document.getElementById('patientHistoryModal');
    
    if (event.target == videoModal) {
        closeVideoCall();
    }
    if (event.target == historyModal) {
        closePatientHistory();
    }
} 