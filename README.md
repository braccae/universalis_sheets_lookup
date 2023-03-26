# universalis_sheets_lookup
a Google apps script function for Sheets to lookup items in the player marketboards across world servers in Final Fantasy XIV Online using the community tool Universalis and XIVAPI
To use this function, simply call UNIVERSALIS with the appropriate arguments, like this:

=UNIVERSALIS("Dwarven Mythril Nugget","Aether",TRUE,"price")

This will search for the cheapest available sale listing of the item "Dwarven Mythril Nugget" on the Aether data center, filtered by HQ versions only, and returning the price per unit. You can modify the arguments to customize the search parameters, such as the item name, data center, HQ filter, and data to return (either "price" or "world" for the cheapest price or the world server name, respectively). You can also use cell references for these arguments, to make the function more flexible.

Note that the script also includes a random delay to comply with API access rate limitations, which should help avoid triggering rate limiting errors when using the function in large spreadsheets. No API key is required for this function, as detailed in the Universalis API documentation.