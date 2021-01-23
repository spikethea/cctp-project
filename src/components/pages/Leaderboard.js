import React from 'react';
import styles from  './UserInterface.module.css';

const Leaderboard = () => {
    return (
    <div className={styles.container}>
        <table className={styles.leaderboard}>
        <tbody>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
            </tr>
            <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
            </tr>
            <tr>
                <td>Eve</td>
                <td>Jackson</td>
                <td>94</td>
            </tr>
        </tbody>
        </table>
    </div>
    )
}

export default Leaderboard