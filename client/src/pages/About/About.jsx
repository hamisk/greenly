import shActivities from '../../assets/images/Activities.png'
import shNewActivity from '../../assets/images/newActivity.png'
import shDashboard from '../../assets/images/Dashboard.png'
import shProfile from '../../assets/images/Profile.png'
import shSignup from '../../assets/images/SignUp.png'
import shTechStack from '../../assets/images/techStack.png'

import './About.scss'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div className='about'>
            <h3 className='about__heading'>About</h3>
            <div className="about__wrapper">
                <div className="about__copy-wrap">
                    <p className='about__copy'>Greenly is a tool built to showcase my recently acquired Web Development skills. What excites me most about web dev is the opportunity it provides to come up with creative solutions to real world problems.<br/>I'm developing the skills needed in order to leverage tech to empower people in working towards building a sustainable future. To that end I built Greenly to help the environmentally conscious keep a track of their carbon footprint.</p>
                </div>
                <img src={shTechStack} alt='tech stack' className='about__screenshot' />
            </div>
                <h3 className='about__heading-a'>Using the site</h3>
            <div className="about__wrapper">
                <div className="about__copy-wrap">
                    <p className='about__copy'><Link to='/signup'><span className='about__link'>Sign Up</span></Link> and set a yearly carbon target.</p>
                </div>
                <img src={shSignup} alt='sign up' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <div className="about__copy-wrap">
                    <p className='about__copy'>See a weekly breakdown in your <Link to='/home/profile'><span className='about__link'>Profile</span></Link>.</p>
                </div>
                <img src={shProfile} alt='profile' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <div className="about__copy-wrap">
                    <p className='about__copy'>Browse <Link to='/activities'><span className='about__link'>Activities</span></Link> by category and view their associated carbon footprints.<br/>Add multiple activities to your weekly Activity Summary<br/>Submit an entry to your carbon diary.</p>
                </div>
                <img src={shActivities} alt='activities' className='about__screenshot' />
            </div>
            <div className="about__wrapper">
                <div className="about__copy-wrap">
                    <p className='about__copy'>Know the Carbon emissions of an activity but don't see it on the list?<br/><Link to='/add-new-activity'><span className='about__link'>Add a New Activity</span></Link> to the database for future use for and others - let's crowdsource the carbon footprints of everyday activities</p>
                </div>
                <img src={shNewActivity} alt='new activity' className='about__screenshot' />
            </div>
            <div className="about__wrapper--last">
                <div className="about__copy-wrap">
                    <p className='about__copy'>View your <Link to='/'><span className='about__link'>Dashboard</span></Link> in the Home page to see your progress with respect to your target.<br/>Edit or delete previously logged activities.<br/>Track your weekly consumption over time and get insights on what's contributing most to your carbon footprint.</p>
                </div>
                <img src={shDashboard} alt='dashboard' className='about__screenshot' />
            </div>
        </div>
    )
}

export default About
