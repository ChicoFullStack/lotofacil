export function generatePixPayload(pixKey: string, amount: number, merchantName: string, merchantCity: string, txId: string = "***"): string {
    // Pad value function
    const pad = (id: string, value: string) => {
        return id + String(value.length).padStart(2, "0") + value;
    };

    const payloadFormatIndicator = pad("00", "01");
    const pointOfInitiationMethod = pad("01", "12");

    // Merchant Account Information
    const gui = pad("00", "br.gov.bcb.pix");
    const key = pad("01", pixKey);
    const merchantAccountInformation = pad("26", gui + key);

    const merchantCategoryCode = pad("52", "0000"); // 0000 is default
    const transactionCurrency = pad("53", "986"); // 986 is BRL
    const transactionAmount = pad("54", amount.toFixed(2));
    const countryCode = pad("58", "BR");
    const merchantNameField = pad("59", merchantName);
    const merchantCityField = pad("60", merchantCity);

    // Additional Data Field Template
    const txIdField = pad("05", txId);
    const additionalDataFieldTemplate = pad("62", txIdField);

    let payload = [
        payloadFormatIndicator,
        pointOfInitiationMethod,
        merchantAccountInformation,
        merchantCategoryCode,
        transactionCurrency,
        transactionAmount,
        countryCode,
        merchantNameField,
        merchantCityField,
        additionalDataFieldTemplate,
        "6304", // CRC16 prefix
    ].join("");

    // Calculate CRC16 CCITT
    const crc16 = (str: string) => {
        let crc = 0xffff;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) > 0) crc = (crc << 1) ^ 0x1021;
                else crc = crc << 1;
            }
        }
        return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
    };

    const crc = crc16(payload);
    return payload + crc;
}
