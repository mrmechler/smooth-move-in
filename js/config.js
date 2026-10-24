/* SmoothMove.in - change links and partners here; no account, database, or build step needed. */
window.SMOOTHMOVE_CONFIG = {
  insuranceQuoteUrl: '', // Add your insurance agent's HTTPS quote-form URL.
  perks: [
    {
      id: 'inkind',
      logo: 'assets/inkind.png',
      title: 'inKind',
      category: 'Dining',
      subtitle: 'Find new favorite restaurants and discover dining rewards.',
      url: 'https://app.inkind.com/refer/6J4VSJAP',
      button: 'Explore inKind',
      enabled: true
    },
    {
      id: 'tmobile',
      logo: 'assets/t-mobile.png',
      title: 'T-Mobile',
      category: 'Wireless',
      subtitle: 'Thinking about switching? See what T-Mobile has to offer.',
      url: 'https://referral.t-mobile.com/YxtUIsB',
      button: 'View T-Mobile Offer',
      enabled: true // Confirm T-Mobile permits public website promotion before deploying.
    }
    // Add Four Hands Outlet only after you have a confirmed offer and permission to feature it.
    // Add The Home Depot after you have its approved destination link and offer copy.
  ]
};
