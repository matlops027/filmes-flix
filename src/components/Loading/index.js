import './loading.css';

function Loading(props) {
    return (
        <div className='loading'>
            <h2>Carregando {props.texto}...</h2>
        </div>
    );
}

export default Loading;