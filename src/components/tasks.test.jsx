import { render, screen } from '../test-utils';
import TasksList from './tasksList';

describe('TasksList', () => {
    test('renders tasks', () => {
        render(<TasksList/>);
        const tasksList = screen.getByRole('list') 
        expect(tasksList).toBeInTheDocument(); 
    });
    
    test('Should tasks list render with 3 tasks', () => {
        render(<TasksList />)
        const tasksList = screen.getAllByRole('listitem')
        expect(tasksList).toHaveLength(3) 
    })
});
