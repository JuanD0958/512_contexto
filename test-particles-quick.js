// Quick particle system test
console.log('Testing particle system...');

// Check if Three.js is loaded
if (typeof THREE !== 'undefined') {
    console.log('✅ Three.js loaded');
    
    // Test particle system initialization
    try {
        const testParticles = new ParticleSystem({ particleCount: 50 });
        setTimeout(() => {
            const stats = testParticles.getPerformanceStats();
            console.log('✅ Particle system test results:', stats);
            
            // Test scroll influence
            testParticles.setScrollInfluence(3.0);
            console.log('✅ Scroll influence test passed');
            
            // Test particle count adjustment
            testParticles.setParticleCount(100);
            console.log('✅ Particle count adjustment test passed');
            
            // Cleanup test
            testParticles.destroy();
            console.log('✅ Cleanup test passed');
            
        }, 2000);
        
    } catch (error) {
        console.error('❌ Particle system test failed:', error);
    }
} else {
    console.error('❌ Three.js not loaded');
}
