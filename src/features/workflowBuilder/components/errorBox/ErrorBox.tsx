import { Card } from 'antd';
import './_errorBox.scss';

type ErrorBoxProps = {
    errors: string[];
}

function ErrorBox(props: ErrorBoxProps) {
    return (
        <div className='error-box-wrapper'>
            {props.errors && props.errors.length > 0 &&
                <Card size="small" title="Errors:">
                    {props.errors.map((error) =>
                        <p>{error}</p>
                    )}
                </Card>}
        </div >
    );
}

export default ErrorBox;