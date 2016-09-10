import bookshelf from 'bookshelf';
import db from '../../lib/db';

let Bookshelf;

// Initialize a new Bookshelf instance for reference elsewhere in apap
Bookshelf = bookshelf(db);

export default Bookshelf;
