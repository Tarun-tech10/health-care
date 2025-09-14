// Video Call Variables
let localStream;
let remoteStream;
let isMuted = false;
let isVideoOff = false;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'patient') {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    loadUserData();
    // Load appointments
    loadAppointments();
    // Load medicines
    loadMedicines();
});

// Video Call Functions
async function startVideoCall() {
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
        // and establish a peer connection with the doctor
        // For demo purposes, we'll just show the local video
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera and microphone. Please check your permissions.');
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
}

function toggleMute() {
    if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        isMuted = !isMuted;
        updateMuteButton();
    }
}

function toggleVideo() {
    if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        isVideoOff = !isVideoOff;
        updateVideoButton();
    }
}

function updateMuteButton() {
    const muteButton = document.querySelector('.call-btn:nth-child(1) i');
    muteButton.className = isMuted ? 'fas fa-microphone-slash' : 'fas fa-microphone';
}

function updateVideoButton() {
    const videoButton = document.querySelector('.call-btn:nth-child(2) i');
    videoButton.className = isVideoOff ? 'fas fa-video-slash' : 'fas fa-video';
}

function endCall() {
    closeVideoCall();
}

// Dashboard Functions
function loadUserData() {
    // Get user data from localStorage
    const userName = localStorage.getItem('userName') || 'John Doe';
    document.querySelector('.user-name').textContent = userName;
}

function loadAppointments() {
    // Here you would typically fetch appointments from an API
    // For demo purposes, we're using static data
}

function loadMedicines() {
    // Here you would typically fetch medicines from an API
    // For demo purposes, we're using static data
}

function viewPrescriptions() {
    // Redirect to prescriptions page
    window.location.href = 'prescriptions.html';
}

function viewMedicines() {
    // Redirect to medicines page
    window.location.href = 'medicines.html';
}

function contactSupport() {
    // Open support chat or redirect to support page
    alert('Support feature coming soon!');
}

function logout() {
    // Clear user session and redirect to login
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Mark medicine as taken
document.querySelectorAll('.secondary-btn').forEach(button => {
    button.addEventListener('click', function() {
        const medicineCard = this.closest('.medicine-card');
        medicineCard.style.opacity = '0.5';
        this.textContent = 'Taken';
        this.disabled = true;
    });
}); 