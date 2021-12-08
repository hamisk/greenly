// width defined in Loading.scss to match that of container in which this component is called
import earth from '../../assets/animations/Earth-20s-204px.svg';
import './Loading.scss';

function Loading() {
    return (
        <div className="loading__div">
            <img src={earth} alt="earth icon" className="loading__svg" />
        </div>
    )
}

export default Loading;
