/** Edit these links when partners are confirmed. Leave insuranceQuoteUrl empty until ready. */
window.SMOOTHMOVE_CONFIG = {
  insuranceQuoteUrl: '',
  perks: [
    {
      title: 'Change your address',
      subtitle: 'Official USPS change-of-address service',
      category: 'essentials',
      kind: 'Moving resource',
      icon: 'mail',
      href: 'https://moversguide.usps.com/',
      featured: true
    },
    {
      title: 'Get your utilities connected',
      subtitle: 'One place to request help with home services',
      category: 'home',
      kind: 'Concierge service',
      icon: 'zap',
      href: 'https://homeconnectpathway.com/',
      featured: false
    },
    {
      title: 'Your moving checklist',
      subtitle: 'A simple way to stay ahead of moving day',
      category: 'moving',
      kind: 'Free resource',
      icon: 'check',
      href: '#checklist',
      featured: false
    }
    // Add verified offers here. Example structure:
    // { title:'Partner name', subtitle:'Actual verified offer terms', category:'moving',
    //   kind:'Partner offer', icon:'gift', href:'https://your-affiliate-url.com', disclosure:'Affiliate link' }
  ]
};
