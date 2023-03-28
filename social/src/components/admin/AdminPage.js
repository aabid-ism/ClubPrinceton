import './admin.css';
import myImage from './335902510_530628409186015_268151436189215887_n.jpg';
import Form from './Form';
import Sidebar from './Sidebar';

function AdminInterface() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <main>
                <div>
                    {/* <div style={{width: "18rem"}}>
                <img src={myImage} />
            </div> */}
                    <Form />
                </div>

            </main>
        </div>

    )
}

export default AdminInterface;