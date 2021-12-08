// width defined in Loading.scss to match that of container in which this component is called
import earth from '../../assets/animations/Earth-2s-200px.svg';
import './Loading.scss';

function Loading() {
    return (
        <div className="loading">
            <img src={earth} alt="earth icon" className="loading_svg" />
        </div>
    )
}

export default Loading;
