import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useApp } from '../context/AppContext';

interface CryptoDetailProps {
  route: {
    params: {
      symbol: string;
      name: string;
    };
  };
}

export const CryptoDetailScreen: React.FC<CryptoDetailProps> = ({ route }) => {
  const { theme } = useApp();
  const { symbol, name } = route.params;
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState<any>(null);

  useEffect(() => {
    fetchCryptoData();
  }, [symbol]);

  const fetchCryptoData = async () => {
    try {
      // Здесь будет запрос к API для получения данных о криптовалюте
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setLoading(false);
    }
  };

  const tradingViewChart = `
    <html>
      <body style="margin:0;padding:0;background:${theme === 'dark' ? '#000' : '#fff'}">
        <div class="tradingview-widget-container">
          <div id="tradingview_chart"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
          <script type="text/javascript">
            new TradingView.widget({
              "width": "100%",
              "height": "400",
              "symbol": "BINANCE:${symbol}USDT",
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "${theme}",
              "style": "1",
              "locale": "en",
              "toolbar_bg": "${theme === 'dark' ? '#000' : '#fff'}",
              "enable_publishing": false,
              "hide_top_toolbar": false,
              "container_id": "tradingview_chart"
            });
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            {name} ({symbol})
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <WebView
            source={{ html: tradingViewChart }}
            style={styles.chart}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <>
            <View style={styles.infoSection}>
              <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Market Data
              </Text>
              {/* Здесь будет информация о рынке */}
            </View>

            <View style={styles.infoSection}>
              <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Social Links
              </Text>
              {/* Здесь будут социальные ссылки */}
            </View>

            <View style={styles.infoSection}>
              <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Security Analysis
              </Text>
              {/* Здесь будет анализ безопасности */}
            </View>

            <View style={styles.externalLinks}>
              <TouchableOpacity
                style={styles.externalLink}
                onPress={() => Linking.openURL(`https://coinmarketcap.com/currencies/${name.toLowerCase()}`)}>
                <Text style={styles.linkText}>View on CoinMarketCap</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.externalLink}
                onPress={() => Linking.openURL(`https://www.coingecko.com/en/coins/${name.toLowerCase()}`)}>
                <Text style={styles.linkText}>View on CoinGecko</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 400,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  chart: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  externalLinks: {
    padding: 20,
  },
  externalLink: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
}); 