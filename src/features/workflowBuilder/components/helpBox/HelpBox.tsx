import { Card } from 'antd';
import './_helpBox.scss';

function HelpBox() {
    return (
        <div className='help-box-wrapper'>
            <Card size="small" title="Help:">
                <p>Drag nodes to the screen from the node menu</p>
                <p>Delete a node or edge by clicking on it and hitting delete</p>
                <p>Drag background to move around</p>
            </Card>
        </div >
    );
}

export default HelpBox;