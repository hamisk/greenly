import shActivities from '../../assets/images/Activities.png'
import shNewActivity from '../../assets/images/newActivity.png'
import shDashboard from '../../assets/images/Dashboard.png'
import shProfile from '../../assets/images/Profile.png'
import shSignup from '../../assets/images/SignUp.png'
import shTechStack from '../../assets/images/techStack.png'

import './About.scss'

function About() {
    return (
        <div className='about'>
            <h3 className='about__heading'>About</h3>
            <div className="about__wrapper">
                <p className='about__copy'>Greenly is a tool built to showcase my recently acquired Web Development skills. What excites me most about web dev is the opportunity it provides to come up with creative solutions to real world problems. I'm developing the skills needed in order to leverage tech to empower people in working towards building a sustainable future. To that end I built Greenly to help the environmentally conscious keep a track of their carbon footprint.</p>
                <img src={shTechStack} alt='tech stack' className='about__screenshot' />
            </div>
                <h3 className='about__heading'>Using the site</h3>
            <div className="about__wrapper">
                <p className='about__copy'>Sign Up and set a yearly carbon target.</p>
                <img src={shSignup} alt='sign up' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <p className='about__copy'>See a weekly breakdown in your Profile.</p>
                <img src={shProfile} alt='profile' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <p className='about__copy'>Browse Activities by category and view their associated carbon footprints.<br/>Add multiple activities to your weekly Activity Summary<br/>Submit an entry to your carbon diary.</p>
                <img src={shActivities} alt='activities' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <p className='about__copy'>Know the Carbon emissions of an activity but don't see it on the list?<br/>Add a New Activity to the database for future use for and others - let's crowdsource the carbon footprints of everyday activities</p>
                <img src={shNewActivity} alt='new activity' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <p className='about__copy'>View your Dashboard in the Home page to see your progress with respect to your target.<br/>Edit or delete previously logged activities.<br/>Track your weekly consumption over time and get insights on what's contributing most to your carbon footprint.</p>
                <img src={shDashboard} alt='dashboard' className='about__screenshot' />
            </div>
        </div>
    )
}

export default About
