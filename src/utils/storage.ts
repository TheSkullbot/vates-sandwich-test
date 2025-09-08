export function readJSON<T>( key : string, fallback : T ) : T
{
  try
  {
    const raw = localStorage.getItem( key );
    
    if( !raw )
      return fallback;
    
    return JSON.parse( raw ) as T;
  }
  catch( e )
  {
    console.warn( "Failed to read localStorage key", key, e );
    return fallback;
  }
}

export function writeJSON<T>( key : string, value : T ) : void
{
  try
  {
    localStorage.setItem( key, JSON.stringify( value ) );
  }
  catch( e )
  {
    console.warn( "Failed to write localStorage key", key, e );
  }
}
