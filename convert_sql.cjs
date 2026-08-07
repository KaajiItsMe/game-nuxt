const fs = require('fs');

try {
    let sql = fs.readFileSync('c:\\Users\\ASUS\\Downloads\\game.sql', 'utf8');

    // Extract only the INSERT statements
    const insertMatches = sql.match(/INSERT INTO `[^`]+` \([^)]+\) VALUES[\s\S]*?;/g);

    if (insertMatches) {
        let out = insertMatches.join('\n\n');
        
        // 1. Replace backticks with double quotes for identifiers
        out = out.replace(/`/g, '"');
        
        // 2. Replace escaped single quotes (\') with Postgres style ('')
        out = out.replace(/\\'/g, "''");
        
        // 3. Remove backslash from escaped double quotes (\") since Postgres strings are single-quoted
        out = out.replace(/\\"/g, '"');
        
        // 4. Handle MySQL's 0 and 1 booleans at the end of the games tuple
        // e.g., 'https://...', 0) -> 'https://...', false)
        out = out.replace(/, 0\)/g, ', false)');
        out = out.replace(/, 1\)/g, ', true)');

        // Save the output
        fs.writeFileSync('c:\\Users\\ASUS\\Downloads\\supabase_import.sql', out);
        console.log('SUCCESS: supabase_import.sql created!');
    } else {
        console.log('No INSERT statements found.');
    }
} catch (error) {
    console.error('Error:', error.message);
}
