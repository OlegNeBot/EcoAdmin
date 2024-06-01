import {BorderlessTableOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined} from "@ant-design/icons";
import {Button, Checkbox, Col, Flex, Form, FormProps, Input, Row, Typography} from "antd";
import {useCallback, useState} from "react";

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const textStyle: React.CSSProperties = {
    color: "#4D7D0F",
    fontFamily: "Segoe UI",
};

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Разобраться с этими событиями.
    // TODO: Исправить values:any.

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback((values: any) => {
        setIsLoading(true);
        console.log("Success:", values);
        setIsLoading(false);
    }, []);

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Row align="middle" style={{height: "100vh"}}>
            <Col span={16} offset={4}>
                <Flex align="center" justify="center" vertical>
                    <Typography.Title level={1} style={textStyle}>
                        EcoAdmin
                    </Typography.Title>
                    <Typography.Title level={3} style={textStyle}>
                        Вход
                    </Typography.Title>
                    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{required: true, message: "Неправильный email!"}]}
                            style={textStyle}
                        >
                            <Input
                                placeholder="Ваш email"
                                size="large"
                                prefix={<MailOutlined />}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Пароль"
                            name="password"
                            rules={[{required: true, message: "Неправильный пароль!"}]}
                        >
                            <Input.Password
                                placeholder="Ваш пароль"
                                size="large"
                                prefix={<BorderlessTableOutlined />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item<FieldType> name="remember" valuePropName="checked">
                            <Checkbox style={textStyle}>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Col>
        </Row>
    );
};

export default LoginPage;
