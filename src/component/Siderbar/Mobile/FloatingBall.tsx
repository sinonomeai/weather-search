export const FloatingBall = ({ handleAdd }) => {
    return (
        <div className='floating-ball md:hidden'>
            <button
                style={{ fontSize: "28px", color: "white", cursor: "pointer" }}
                onClick={handleAdd}>
                ☰
            </button>
        </div>
    )
}
