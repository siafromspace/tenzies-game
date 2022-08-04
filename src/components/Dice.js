function Dice(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDie}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Dice