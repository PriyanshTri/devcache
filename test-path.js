const path = ['..', '.', 'foo/bar', 'baz\\qux', 'null\0byte'];
console.log(path.some(segment => segment === '..' || segment === '.' || segment.includes('/') || segment.includes('\\') || segment.includes('\0')));
